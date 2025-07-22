from sentence_transformers import SentenceTransformer
from transformers import pipeline
from app.vectorstore.chroma_client import create_or_load_collection

# Load embedding model
embed_model = SentenceTransformer("all-MiniLM-L6-v2")

# Load LLM model from HuggingFace
qa_pipeline = pipeline(
    "text2text-generation",
    model="google/flan-t5-base",
    tokenizer="google/flan-t5-base"
)

def get_answer(user_question: str, top_k: int = 3) -> str:
    # Embed the user's question
    question_embedding = embed_model.encode([user_question])[0]

    # Load the collection
    collection = create_or_load_collection()

    # Query the vector store
    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=top_k
    )

    # Get top-matching document chunks
    retrieved_chunks = results["documents"][0]
    context = "\n".join(retrieved_chunks)

    # Prepare the prompt for LLM
    prompt = f"Context:\n{context}\n\nQuestion: {user_question}\nAnswer:"

    # Generate answer using the LLM
    response = qa_pipeline(prompt, max_length=256, do_sample=True)
    
    return response[0]["generated_text"]
