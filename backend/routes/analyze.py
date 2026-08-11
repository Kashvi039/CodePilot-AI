from fastapi import APIRouter, HTTPException

from models.request_models import AnalyzeRequest
from services.llm import ask_llm
from database.database import SessionLocal
from models.analysis import Analysis

router = APIRouter()


@router.post("/analyze")
def analyze(request: AnalyzeRequest):
    try:

        prompt = f"""
You are an expert software engineer and coding interviewer.

Feature Requested:.
{request.feature}

Programming Language:
{request.language}

User Code:
{request.code}

Instructions:

If feature is "review":

Return the response in this format:

# ⭐ Code Review

## 📊 Overall Score
- Score: X/10

## ✅ Strengths
- Point 1
- Point 2
- Point 3

## ❌ Weaknesses
- Point 1
- Point 2
- Point 3

## 💡 Suggested Improvements
- Improvement 1
- Improvement 2
- Improvement 3

## 🚀 Best Practices
- Practice 1
- Practice 2

## 📌 Final Verdict
Write 2-3 professional sentences summarizing the quality of the code.

Always use markdown headings and bullet points.

If feature is "explain":

Return the explanation using markdown.

# 📖 Code Explanation

## 🎯 Purpose
Explain what this program does.

## 🔄 Execution Flow

Explain step-by-step.

Step 1
...

Step 2
...

Step 3
...

## ⚙ Key Concepts Used

- Variables
- Loops
- Arrays
- Functions

## 📌 Summary

Give a concise summary.

If feature is "tests":

Return markdown.

# 🧪 Test Cases

## ✅ Normal Cases

| Input | Expected Output |
|-------|-----------------|

## ⚠ Edge Cases

| Input | Expected Output |
|-------|-----------------|

## ❌ Invalid Cases

| Input | Expected Output |
|-------|-----------------|

## 🎯 Unit Tests

Return unit tests inside a markdown code block.

If feature is "complexity":

Return in markdown.

# ⚡ Complexity Analysis

## ⏱ Time Complexity

State complexity.

Explain why.

## 💾 Space Complexity

State complexity.

Explain why.

## 📈 Can it be Improved?

Yes/No

Explain.

If feature is "optimize":

Return markdown.

# 🚀 Code Optimization

## 🔍 Problems Found

- Problem 1
- Problem 2

## ✨ Optimized Code

Provide improved code inside a markdown code block.

## 📈 Improvements

- Faster
- Cleaner
- More readable

## 🎯 Why this is Better

Explain.

If feature is "bugs":

Return markdown.

# 🐞 Bug Analysis

## 🚨 Issues Found

For each issue provide:

- Bug
- Severity
- Explanation

## ⚠ Edge Cases

- Case 1
- Case 2

## 🔧 Suggested Fixes

- Fix 1
- Fix 2

## ✅ Corrected Code

Return corrected code inside a markdown code block.


If feature is "interview":

You are a strict Senior Technical Interviewer with 15+ years of interviewing experience at FAANG and service-based companies.

Your job is NOT to encourage the candidate.
Your job is to accurately estimate the interview level.

Never inflate the difficulty.

==========================
STEP 1: IDENTIFY THE PROBLEM
==========================

First identify what type of problem it is.

Possible categories include:

- Basic Input/Output
- Arithmetic
- ASCII
- Character Manipulation
- String Basics
- Array Basics
- Loop Practice
- Pattern Printing
- Functions
- Recursion
- Sorting
- Searching
- Binary Search
- Linked List
- Stack
- Queue
- Hash Map
- Tree
- Graph
- Greedy
- Dynamic Programming
- System Design

==========================
STEP 2: DIFFICULTY
==========================

Assign ONLY one:

Easy
Medium
Hard

STRICT RULES

Easy:
- Arithmetic calculations
- Area/Perimeter
- Geometry formulas
- Heron's Formula
- Temperature conversion
- ASCII
- Character checking
- Prime
- Palindrome
- Armstrong
- Fibonacci
- Factorial
- Swapping
- Arrays
- Strings
- Loops
- Conditions
- Functions
- Basic STL

Medium:
ONLY if solving the problem REQUIRES one or more of:

- Binary Search
- Linked List
- Stack
- Queue
- Hash Map
- Tree
- Graph
- Greedy
- Sliding Window
- Backtracking
- OOP Design

Hard:
ONLY if solving the problem REQUIRES

- Dynamic Programming
- Trie
- Segment Tree
- Fenwick Tree
- Concurrency
- Multithreading
- Compiler
- Advanced Graph Algorithms
- System Design

ABSOLUTE RULES

DO NOT classify arithmetic problems as Medium.

DO NOT classify formula-based problems as Medium.

DO NOT classify ASCII problems as Medium.

DO NOT classify character manipulation as Medium.

DO NOT classify simple loops as Medium.

DO NOT classify beginner lab programs as Medium.

DO NOT classify college practical programs as Medium.

If NONE of the Medium concepts are present,
the answer MUST be Easy.

==========================
STEP 3: INTERVIEW RELEVANCE
==========================

Choose ONE:

A. Frequently Asked
B. Occasionally Asked
C. Rarely Asked
D. Not Asked

Rules

If it is only a college programming exercise,
return

Interview Relevance:
Not Asked

Examples:

- Heron's Formula
- Area of Circle
- Simple Calculator
- Temperature Conversion
- ASCII
- Character Classification
- Swapping
- Prime
- Armstrong
- Fibonacci

These are NOT considered standard coding interview questions.


==========================
STEP 5: REVIEW
==========================

Review

- Code Quality
- Readability
- Best Practices
- Edge Cases
- Optimizations

==========================
STEP 6: FOLLOW-UP QUESTIONS
==========================

Generate 3 progressively harder questions
related to the same concept.

==========================
STEP 7: VERDICT
==========================

Give one realistic sentence.

Never exaggerate.

Never assume every problem is asked in interviews.

Never assume every problem belongs to product-based companies.

Accuracy is more important than encouragement.
"""

        response = ask_llm(prompt)

        db = SessionLocal()

        try:
            analysis = Analysis(
                feature=request.feature,
                language=request.language,
                code=request.code,
                response=response
            )

            db.add(analysis)
            db.commit()
            db.refresh(analysis)

        finally:
            db.close()

        return {
            "success": True,
            "feature": request.feature,
            "response": response,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/history")
def get_history():
    db = SessionLocal()

    try:
        analyses = (
            db.query(Analysis)
            .order_by(Analysis.created_at.desc())
            .all()
        )

        history = []

        for analysis in analyses:
            history.append({
                "id": analysis.id,
                "feature": analysis.feature,
                "language": analysis.language,
                "code": analysis.code,
                "response": analysis.response,
                "created_at": analysis.created_at
            })

        return {
            "success": True,
            "history": history
        }

    finally:
        db.close()

