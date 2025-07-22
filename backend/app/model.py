from pydantic import BaseModel
from typing import List, Optional

class QARequest(BaseModel):
    question: str
    top_k: int = 3

class QAResponse(BaseModel):
    answer: str
    sources: List[str]
