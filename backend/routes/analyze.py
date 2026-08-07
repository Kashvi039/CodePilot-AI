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

        return {
            "success": True,
            "feature": request.feature,
            "response": response,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))