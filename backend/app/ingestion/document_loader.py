import os
import fitz  # PyMuPDF
from typing import List
from langchain_core.documents import Document

def load_pdf(file_path: str) -> List[Document]:
    """Load a PDF file and return a list of LangChain Documents."""
    doc = fitz.open(file_path)
    documents = []

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        metadata = {
            "source": file_path,
            "page": page_num + 1
        }
        documents.append(Document(page_content=text, metadata=metadata))

    return documents

def load_documents_from_folder(folder_path: str) -> List[Document]:
    """Load all PDF documents from a folder."""
    all_documents = []

    for root, _, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            if file_path.lower().endswith(".pdf"):
                print(f"📂 Loading: {file_path}")
                docs = load_pdf(file_path)
                all_documents.extend(docs)

    return all_documents

def load_documents(path: str) -> List[Document]:
    """
    Entry point for loading documents.
    If a folder is given, loads all PDFs inside.
    If a single file is given, loads that file.
    """
    if os.path.isdir(path):
        return load_documents_from_folder(path)
    elif path.lower().endswith(".pdf"):
        return load_pdf(path)
    else:
        raise ValueError(f" Unsupported file type or path: {path}")
