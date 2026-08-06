from fastapi import APIRouter, HTTPException

from models.request_models import AnalyzeRequest
from services.llm import ask_llm

router = APIRouter()


@router.post("/analyze")
def analyze(request: AnalyzeRequest):
    try:

        prompt = f"""
You are an expert software engineer and coding interviewer.

Feature Requested:
{request.feature}

Programming Language:
{request.language}

User Code:
{request.code}

Instructions:

If feature is "review":
- Review the code professionally.
- Give a score out of 10.
- Mention strengths.
- Mention weaknesses.
- Suggest improvements.

If feature is "explain":
- Explain the code step-by-step.

If feature is "tests":
- Generate unit test cases.

If feature is "complexity":
- Tell time complexity.
- Tell space complexity.
- Explain why.

If feature is "optimize":
- Optimize the code.
- Return improved code.
- Explain changes.

If feature is "bugs":
- Analyze the code for logical bugs.
- Find runtime errors.
- Find syntax mistakes (if any).
- Find memory leaks (if applicable).
- Find edge cases that may fail.
- Mention severity (Low, Medium, High).
- Suggest fixes.
- Return corrected code if needed.

If feature is "interview":
- Act as a senior software engineering interviewer.
- Analyze the submitted code.
- Estimate the interview difficulty (Easy/Medium/Hard).
- Mention companies where similar problems are commonly asked.
- Ask 3-5 follow-up interview questions.
- Highlight edge cases.
- Mention common mistakes candidates make.
- Suggest the optimal solution or approach.
- Return the response in clean markdown.

If feature is "security":
- Perform a security review of the code.
- Identify security vulnerabilities.
- Mention their severity (Low, Medium, High, Critical).
- Explain why each issue is dangerous.
- Suggest secure alternatives.
- Return secure code if changes are needed.

Return the response in clean markdown.
"""

        response = ask_llm(prompt)

        return {
            "success": True,
            "feature": request.feature,
            "response": response,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))