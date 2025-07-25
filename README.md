# Internal Docs Q&A Agent
## Project Overview
The Internal Docs Q&A Agent is a full-stack application designed to allow users to upload internal documents (e.g., PDFs) and then query those documents using an AI-powered conversational interface. It provides a secure login, document management, and a chat interface to interact with a Retrieval Augmented Generation (RAG) system.

## Key Features
* User Authentication: Simple login page (placeholder authentication).

* Dashboard: Central hub for navigating to different functionalities.

* Document Upload: Upload PDF documents to the backend for processing.

* AI-Powered Q&A Chat: Ask questions about the uploaded documents and receive AI-generated answers.

* Document Listing: View a list of all uploaded documents with basic details.

* User Profile: Display basic user information.

## Technologies Used
This project is built with a React frontend and a FastAPI backend.

## Frontend:

* React.js: A JavaScript library for building user interfaces.

* Vite: A fast build tool for modern web projects.

* Tailwind CSS: A utility-first CSS framework for rapid UI development.

* react-router-dom: For declarative routing in React applications.

* shadcn/ui: A collection of re-usable components built with Radix UI and Tailwind CSS.

* axios (or fetch API): For making HTTP requests to the backend.

## Backend:

* FastAPI: A modern, fast (high-performance) web framework for building APIs with Python 3.7+.

* Uvicorn: An ASGI server for running FastAPI applications.

* Pydantic: For data validation and settings management.

* python-multipart: Required for handling file uploads in FastAPI.

* google-generativeai: For interacting with Google's Gemini API (specifically Gemini 2.0 Flash) for AI responses.

* sentence-transformers: For generating embeddings from text (e.g., all-MiniLM-L6-v2).

* transformers: For loading LLM models (e.g., google/flan-t5-base).

* langchain / langchain-community / langchain-core: For building the RAG pipeline (document loading, chunking, vector store interaction).

* PyMuPDF (fitz): For loading and extracting text from PDF documents.

* ChromaDB: A vector database used to store and retrieve document embeddings.

* dotenv: For managing environment variables.

## Folder Structure

```
internal-docs-qa-agent/
├── .venv/                      # Python Virtual Environment
├── backend/
│   ├── app/
│   │   ├── config/             # Backend configuration
│   │   ├── core/               # Core Q&A chain logic (qa_chain.py)
│   │   ├── ingestion/          # Document loading, chunking, embedding (document_loader.py, chunker.py, embedder.py, run_ingestion.py)
│   │   ├── vectorstore/        # ChromaDB client (chroma_client.py)
│   │   ├── api.py              # FastAPI application & API endpoints
│   │   ├── model.py            # Pydantic models for API
│   │   └── rag_pipeline.py     # RAG pipeline logic
│   └── requirements.txt        # Python dependencies
├── docs/                       # Directory for uploaded documents
│   └── sample docs/            # Default location for uploaded files and vector store
│       └── chroma_db/          # ChromaDB persistent storage
│           └── chroma.sqlite3
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/
│   │   ├── components/         # React components (Dashboard, ChatPage, UploadPage, etc.)
│   │   │   └── ui/             # Shadcn/ui components (button, card, input, etc.)
│   │   ├── lib/                # Utility functions (utils.js)
│   │   ├── App.jsx             # Main React application, handles routing
│   │   ├── index.css           # Global CSS and Tailwind directives
│   │   └── index.jsx           # React app entry point
│   ├── .gitignore              # Git ignore for frontend (e.g., node_modules)
│   ├── components.json         # Shadcn/ui configuration
│   ├── index.html              # Frontend entry HTML
│   ├── jsconfig.json           # JS configuration for aliases
│   ├── package-lock.json       # Frontend dependency lock file
│   ├── package.json            # Frontend dependencies and scripts
│   ├── postcss.config.js       # PostCSS configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   └── vite.config.js          # Vite build tool configuration
├── .gitignore                  # Root Git ignore (for .venv, data, etc.)
└── README.md                   # This file
```

## Setup Instructions
Follow these steps to set up and run the application locally.

## Prerequisites
* Git: For cloning the repository.

* Python 3.9+: For the backend.

* Node.js (LTS recommended): For the frontend.

* npm (Node Package Manager): Comes with Node.js.

## 1. Clone the Repository
```
git clone <https://github.com/Manikandan1511/internal-docs-qa-agent>
cd internal-docs-qa-agent
```
## 2. Backend Setup
Navigate into the backend directory, set up a virtual environment, install dependencies, and start the FastAPI server.
```
cd backend

# Create a Python virtual environment
python3 -m venv .venv

# Activate the virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows (Command Prompt):
.venv\Scripts\activate.bat
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1

# Install backend dependencies
pip install -r requirements.txt

# Install python-multipart for file uploads (if not already in requirements.txt)
pip install python-multipart

# Navigate back to the root of the backend application
cd app

# Start the FastAPI server
# This will run on http://127.0.0.1:8000
uvicorn api:app --reload

# Keep this terminal window open and running for the backend server.
```

## 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the development server.
```
# Open a NEW terminal window
cd internal-docs-qa-agent/frontend

# Install frontend dependencies
npm install

# Start the React development server
# This will run on http://localhost:5173
npm run dev

# Keep this terminal window open and running for the frontend server.
```
## Usage
Access the Application: Open your web browser and navigate to http://localhost:5173/.

### Login: Use the placeholder credentials:

* Username: admin

* Password: admin

### Navigate:

* From the Dashboard, you can click on the cards to navigate to:

  * Upload File: Upload documents.

  * AI Q&A: Access the chat interface (this page includes the sidebar).

  * View Docs: See a list of uploaded documents.

  * User Profile: View user details.

* The Sidebar (visible on the Chat Q&A page) also provides direct navigation to all main sections.

### Chat Q&A:

* On the "AI Q&A" page, type your question in the input box and press Enter or click "Send".

* The AI will respond based on its current knowledge (which will be limited until documents are ingested).

### Upload Documents:

* On the "Upload Documents" page, click "Choose File", select a PDF document from your device, and click "Upload File".

* The file will be saved to internal-docs-qa-agent/docs/sample docs/ on your backend.

### View Docs:

* On the "View Docs" page, you will see a list of files that have been uploaded to the backend's docs/sample docs/ directory.

### API Endpoints
Backend (FastAPI) - http://127.0.0.1:8000

* GET /: Root endpoint, returns a simple message.

* POST /query: Accepts {"question": "..."} and returns {"answer": "...", "sources": [...]} for AI Q&A.

* POST /uploadfile/: Accepts a multipart/form-data file upload and saves it to docs/sample docs/.

* GET /docs/: Returns a list of uploaded documents (name, size, last modified).

* GET /profile/: Returns static user profile information.

### Future Enhancements
Full Document Ingestion: Implement the run_ingestion_pipeline in the backend to automatically process (chunk, embed, store in ChromaDB) uploaded documents, making them immediately searchable by the AI.

* Robust Authentication: Replace the placeholder login with a proper authentication system (e.g., JWT, OAuth).

* Document Deletion/Management: Add functionality to delete or manage documents from the View Docs page.

* Improved UI/UX: Enhance styling, add animations, and ensure full responsiveness across all devices.

* Search Functionality: Add a search bar to the View Docs page to easily find specific documents.

* Error Boundaries: Implement React error boundaries for graceful error handling in the frontend.

* Loading States & Feedback: Improve loading indicators and user feedback for all asynchronous operations.

* Backend Scaling: Consider deploying the backend with a production-ready ASGI server (like Gunicorn + Uvicorn) and potentially containerization (Docker).

## License
This project is open-source.
