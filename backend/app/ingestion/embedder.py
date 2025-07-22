from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")  # Free and lightweight

def embed_chunks(chunks):
    embeddings = model.encode(chunks)
    return embeddings
