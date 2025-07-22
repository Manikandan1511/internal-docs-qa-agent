import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from backend.app.model import QARequest, QAResponse
from backend.app.core.qa_chain import query_doc

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

@app.get("/")
async def root():
    return {"message": "Internal Docs QA Agent Backend is running."}

@app.post("/query", response_model=QAResponse)
def query_endpoint(payload: QARequest):
    print("Received payload:", payload)
    try:
        result = query_doc(payload.question)
        return QAResponse(answer=result["answer"], sources=result["sources"])
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})
