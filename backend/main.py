import os
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not set in the .env file.")

client = genai.Client(api_key=api_key)

app = FastAPI(
    title="EduGenie API",
    description="Google Gemini Powered Learning Assistant",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:8081",
        "http://localhost:5173",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:8081",
        "http://127.0.0.1:5173",
        "https://edugenie-frontend-web.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "success": True,
        "message": "Welcome to EduGenie!",
        "status": "Backend is working"
    }


def generate_response(prompt: str):

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-3.5-flash-lite",
                contents=prompt
            )

            return response

        except Exception as e:
            error_message = str(e)

            if "503" in error_message or "UNAVAILABLE" in error_message:
                if attempt < 2:
                    time.sleep(3 * (attempt + 1))
                    continue

            raise e


@app.get("/ask")
def ask_question(question: str):

    try:
        prompt = f"""
You are EduGenie, an AI educational assistant.

Answer the following student's question clearly and accurately.

Question:
{question}

Rules:
- Use simple student-friendly language.
- Explain difficult terms.
- Give examples when useful.
- Keep the answer organized.
"""

        response = generate_response(prompt)

        return {
            "success": True,
            "answer": response.text
        }

    except Exception as e:
        return {
            "success": False,
            "answer": "Gemini is currently unavailable. Please try again later.",
            "error": str(e)
        }


@app.get("/quiz")
def generate_quiz(topic: str):

    try:
        prompt = f"""
Create a quiz for students about:

{topic}

Create exactly 5 multiple-choice questions.

For each question provide:

Question 1:
A.
B.
C.
D.

Correct Answer:

Repeat this format for all 5 questions.

Rules:
- Questions must be educational.
- Use clear and simple language.
- Make the options different from each other.
- Provide the correct answer for every question.
"""

        response = generate_response(prompt)

        return {
            "success": True,
            "quiz": response.text
        }

    except Exception as e:
        return {
            "success": False,
            "quiz": "Quiz generation is currently unavailable. Please try again later.",
            "error": str(e)
        }


@app.get("/summarize")
def summarize_text(text: str):

    try:
        prompt = f"""
Summarize the following educational text.

Rules:
- Use simple language.
- Keep the important points.
- Remove unnecessary details.
- Make it easy for students to understand.
- Use bullet points when useful.

Educational Text:

{text}
"""

        response = generate_response(prompt)

        return {
            "success": True,
            "summary": response.text
        }

    except Exception as e:
        return {
            "success": False,
            "summary": "Text summarization is currently unavailable. Please try again later.",
            "error": str(e)
        }


@app.get("/explain")
def explain_topic(topic: str):

    try:
        prompt = f"""
Explain the following topic to a student in very simple language.

Topic:
{topic}

Include:

1. Simple definition
2. Easy explanation
3. One simple example
4. Important points to remember

Avoid unnecessarily complicated terminology.
"""

        response = generate_response(prompt)

        return {
            "success": True,
            "explanation": response.text
        }

    except Exception as e:
        return {
            "success": False,
            "explanation": "Simple explanation is currently unavailable. Please try again later.",
            "error": str(e)
        }


@app.get("/recommend")
def recommend_learning(subject: str, level: str):

    try:
        prompt = f"""
Create a personalized learning plan for a student.

Subject:
{subject}

Student Level:
{level}

Include:

1. Topics to learn
2. Recommended learning order
3. Practice suggestions
4. Weekly study plan
5. Tips for improving

Keep the language simple and student-friendly.
"""

        response = generate_response(prompt)

        return {
            "success": True,
            "recommendation": response.text
        }

    except Exception as e:
        return {
            "success": False,
            "recommendation": "Learning recommendations are currently unavailable. Please try again later.",
            "error": str(e)
        }