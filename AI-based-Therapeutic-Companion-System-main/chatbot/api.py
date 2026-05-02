from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware

from chatbot_engine import chatbot_reply, handle_option

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for now (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ FIXED typing
class ChatRequest(BaseModel):
    message: str
    scores: Dict[str, float]

class OptionRequest(BaseModel):
    option: str
    intent: str
    scores: Dict[str, float]

@app.get("/")
def home():
    return {"message": "API is running"}

@app.post("/chat")
def chat(req: ChatRequest):
    return chatbot_reply(req.message, req.scores)

@app.post("/option")
def option(req: OptionRequest):
    return {"response": handle_option(req.option, req.intent, req.scores)}