from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# 👇 Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Reflection(BaseModel):
    text: str

@app.post("/analyze")
def analyze_emotion(reflection: Reflection):
    text = reflection.text.lower()

    if any(word in text for word in ["nervous", "anxious", "worried"]):
        return {"emotion": "Anxious", "confidence": 0.91}
    elif any(word in text for word in ["happy", "excited", "grateful"]):
        return {"emotion": "Happy", "confidence": 0.93}
    elif any(word in text for word in ["sad", "upset", "lonely"]):
        return {"emotion": "Sad", "confidence": 0.89}
    elif any(word in text for word in ["angry", "mad", "furious"]):
        return {"emotion": "Angry", "confidence": 0.88}
    else:
        return {"emotion": "Neutral", "confidence": 0.75}

