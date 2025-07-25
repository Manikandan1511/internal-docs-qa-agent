from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain.vectorstores.base import VectorStoreRetriever
from langchain.embeddings.base import Embeddings

from typing import List, Optional
import os

CHROMA_PATH = "chroma_db"
COLLECTION_NAME = "rag-docs"

def get_embedding_model() -> Embeddings:
    return HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

def create_or_load_collection() -> VectorStoreRetriever:
    embedding_function = get_embedding_model()

    vectordb = Chroma(
        persist_directory=CHROMA_PATH,
        collection_name=COLLECTION_NAME,
        embedding_function=embedding_function
    )

    retriever = vectordb.as_retriever()
    return retriever

def store_embeddings(docs: List[Document]) -> None:
    embedding_function = get_embedding_model()

    vectordb = Chroma.from_documents(
        documents=docs,
        embedding=embedding_function,
        persist_directory=CHROMA_PATH,
        collection_name=COLLECTION_NAME
    )

    vectordb.persist()
