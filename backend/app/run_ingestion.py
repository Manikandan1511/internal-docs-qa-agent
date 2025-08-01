import sys
import os
from ingestion.document_loader import load_documents
from vectorstore.chroma_client import store_embeddings

def ingest():
    print("Starting ingestion process...")
    if len(sys.argv) < 2:
        print("Usage: python run_ingestion.py <path-to-documents>")
        sys.exit(1)

    input_path = sys.argv[1]

    print("Step 1: Loading documents...")
    documents = load_documents(input_path)

    print("Step 2: Storing embeddings...")
    store_embeddings(documents)

    print(" Ingestion completed!")

if __name__ == "__main__":
    ingest()
