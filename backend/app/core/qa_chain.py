import os
from google.generativeai import GenerativeModel
from google.generativeai import configure
from dotenv import load_dotenv

load_dotenv()

# Load Gemini API Key from .env
configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize Gemini Pro model
model = GenerativeModel("gemini-2.0-flash")  #  Updated model name to the correct version

def query_doc(question: str, top_k: int = 3):
    try:
        print(f"Querying Gemini with: {question}")
        response = model.generate_content(question)
        answer = response.text

        return {
            "answer": answer,
            "sources": []  # Optional: you can later enhance this with actual doc sources
        }
    except Exception as e:
        print("[Gemini Error]", str(e))
        raise e
