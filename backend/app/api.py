# backend/app/api.py

import os
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from typing import List, Dict, Union
from fastapi import Depends


# Assuming these imports are correct based on your backend structure
from backend.app.model import QARequest, QAResponse
from backend.app.core.qa_chain import query_doc
# You might need to adjust this import based on your exact ingestion setup
# Ensure run_ingestion_pipeline is available and correctly imported
try:
    from backend.app.ingestion.run_ingestion import run_ingestion_pipeline
except ImportError:
    # Fallback or log if run_ingestion_pipeline is not found, for development
    print("Warning: run_ingestion_pipeline not found. File ingestion will only save, not process.")
    run_ingestion_pipeline = None


# FastAPI app setup
app = FastAPI()

# CORS (adjust origin for frontend if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the directory for uploaded files relative to the api.py file.
# This will save files into `internal-docs-qa-agent/docs/sample docs/`
# (which is "../../docs/sample docs" relative to backend/app/api.py).
UPLOAD_DIRECTORY = os.path.join(os.path.dirname(__file__), "..", "..", "docs", "sample docs")
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True) # Create directory if it doesn't exist

@app.get("/")
async def root():
    """Root endpoint for the API."""
    return {"message": "Internal Docs QA Agent Backend is running."}

@app.post("/query", response_model=QAResponse)
def query_endpoint(payload: QARequest):
    """Endpoint to query the AI agent with a question."""
    print("Received payload for query:", payload)
    try:
        # Call your core Q&A chain function
        result = query_doc(payload.question)
        return QAResponse(answer=result["answer"], sources=result.get("sources", []))
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error processing query: {e}")

@app.post("/uploadfile/", response_model=Dict[str, str])
async def upload_file(file: UploadFile = File(...)):
    """Endpoint to upload a document file."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    try:
        # Save the uploaded file
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())
        
        # Trigger the ingestion pipeline if available
        if run_ingestion_pipeline:
            print(f"Starting ingestion pipeline for {file.filename}...")
            # Assuming run_ingestion_pipeline takes the file path and handles processing
            # You might need to run this in a background task if it's long-running
            run_ingestion_pipeline(file_location)
            print(f"Ingestion pipeline for {file.filename} triggered.")
        else:
            print("run_ingestion_pipeline not available. File saved but not processed.")

        return {"message": f"File '{file.filename}' uploaded and saved successfully.", "filename": file.filename}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Could not upload file: {e}")

@app.get("/docs/", response_model=List[Dict[str, Union[str, int]]])
async def list_documents():
    """Endpoint to list available documents."""
    documents = []
    try:
        # List files in the UPLOAD_DIRECTORY
        for filename in os.listdir(UPLOAD_DIRECTORY):
            file_path = os.path.join(UPLOAD_DIRECTORY, filename)
            if os.path.isfile(file_path):
                documents.append({
                    "name": filename,
                    "size_bytes": os.path.getsize(file_path),
                    "last_modified": int(os.path.getmtime(file_path)) # Unix timestamp
                })
    except FileNotFoundError:
        # If the directory doesn't exist, return an empty list or an error
        raise HTTPException(status_code=404, detail=f"Document directory '{UPLOAD_DIRECTORY}' not found.")
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Could not list documents: {e}")
    
    return documents

@app.get("/profile/", response_model=Dict[str, str])
async def get_user_profile():
    """Endpoint to get user profile information."""
    
    return {
        "username": "admin",
        "email": "admin@gmail.com",
        "role": "Administrator",
        "status": "Active"
    }


from backend.chroma_db.database import SessionLocal
from backend.chroma_db.models import User
from backend.chroma_db.schemas import UserCreate, UserLogin
from sqlalchemy.orm import Session

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register/")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    
    new_user = User(email=user.email, password=user.password)  # ❗️Store plain password only for demo. Hash it later.
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@app.post("/login/")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email, User.password == user.password).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"message": "Login successful"}
