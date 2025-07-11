# Emotion Reflection Tool
Emotion Reflection Tool is a full-stack web application that allows users to input reflective text and receive real-time emotion analysis. The frontend is built using React with TypeScript, and the backend uses FastAPI and Uvicorn.

## Overview
This tool helps users understand their emotional tone based on the language used in their reflections. It uses simple keyword matching to categorize emotions such as Happy, Sad, Anxious, Angry, or Neutral.

## Features
* Input free-form reflective text
* Detects emotion with confidence score
* Clean, responsive user interface
* Real-time backend analysis using FastAPI
* Error handling for failed API requests

## Tech Stack
### Frontend
* React (Typescript)
* Axios for API requests
* CSS for stying
### Backend
* FastAPI (Python)
* Uvicorn ASGI server
* Pydantic for data validation

## Installation
### Backend Setup
1.Create and activate a Python virtual environment:
``` 
python -m venv venv
source venv/bin/activate
```
2.Install backend dependencies:
```
pip install -r requirements.txt
```
3.Run the FastAPI backend:
```
uvicorn main:app --reload
```

### Frontend Setup
1.Navigate to the frontend directory and install dependencies:
```
npm install
```
2.Start the React development server:
```
npm start
```
3.Open the application in your browser at:
```
http://localhost:3000
```

## Backend Logic
The backend provides a single POST endpoint at /analyze, which accepts JSON input with a "text" field. It classifies emotions based on the presence of specific keywords:
```
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
```
This logic can later be replaced with a more advanced Natural Language Processing model for improved accuracy.

## Usage
1.Start both backend and frontend servers.
2.Enter any reflective text in the text area.
3.Submit to receive emotion classification and confidence percentage.

## Screenshots
![Home page with text input](./screenshots/example.png)
![Example result showing detected emotion and confidence](./screenshots/example.png)
![Error message when backend is offline](./screenshots/example.png)

## Future Improvements
* Replace keyword matching with machine learning or NLP libraries (e.g., spaCy, Transformers)
* Add user authentication and dashboards
* Enable data export (PDF, CSV)
* Track and visualize historical emotion trends
* Support for multiple languages
* Improve mobile responsiveness and UX
