# 🚀 CodePilot AI

> An AI-powered code analysis platform that helps developers review, optimize, debug, understand, and prepare for coding interviews—all in one place.

![React](https://img.shields.io/badge/React-19-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black)
![Render](https://img.shields.io/badge/Backend-Render-blue)
![Groq](https://img.shields.io/badge/LLM-Groq-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌐 Live Demo

**Frontend:** https://code-pilot-ai-ladh.vercel.app/

**Backend API:** https://codepilot-ai-3-5t3h.onrender.com

---

# 📖 About

CodePilot AI is an intelligent coding assistant designed to improve code quality and assist developers throughout the software development lifecycle.

Instead of only generating code, CodePilot AI provides:

- Professional code reviews
- Bug detection
- Code optimization
- Complexity analysis
- Step-by-step explanations
- Unit test generation
- Interview-style analysis with realistic difficulty estimation

The project uses modern AI models through the **Groq API** to deliver fast and accurate responses.

---

# ✨ Features

## ⭐ Code Review

Receive a professional review of your code including:

- Overall Score (/10)
- Strengths
- Weaknesses
- Best Practices
- Improvement Suggestions

---

## 🐞 Bug Detection

Automatically detects:

- Logical Bugs
- Runtime Errors
- Syntax Issues
- Edge Cases
- Memory-related problems (where applicable)

Severity levels are also provided.

---

## 🚀 Code Optimization

Get:

- Cleaner code
- Faster implementations
- Better readability
- Performance improvements
- Optimized code output

---

## ⚡ Complexity Analysis

Analyzes:

- Time Complexity
- Space Complexity
- Explanation of complexity
- Possible optimizations

---

## 📖 Code Explanation

Provides beginner-friendly explanations including:

- Purpose
- Execution Flow
- Important Concepts
- Summary

Perfect for learning unfamiliar code.

---

## 🧪 Test Case Generator

Generates:

- Normal Test Cases
- Edge Test Cases
- Invalid Inputs
- Unit Tests

---

## 🎯 Interview Analyzer

A unique feature that evaluates code from an interviewer's perspective.

Provides:

- Problem Category
- Difficulty (Easy / Medium / Hard)
- Interview Relevance
- Companies (only if genuinely relevant)
- Code Review
- Follow-up Interview Questions

Unlike many AI tools, CodePilot AI avoids overestimating the interview difficulty of simple programming problems.

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios

## Backend

- FastAPI
- Python

## AI

- Groq API
- Llama Models

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```
CodePilot-AI
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── ...
│
├── backend
│   ├── models
│   ├── prompts
│   ├── routes
│   ├── services
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/Kashvi039/CodePilot-AI.git

cd CodePilot-AI
```

---

## Backend Setup

```bash
cd backend

python -m venv venv
```

Activate virtual environment

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env`

```env
GROQ_API_KEY=YOUR_API_KEY
```

Run backend

```bash
uvicorn main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 📸 Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/71f1b330-5e6f-458d-a143-45b52ae1f74a" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/00571ead-09f8-4289-aad2-a30e4d94a403" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/948834ba-f600-40b9-8539-869da92fb8fb" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b6758e10-3608-467c-bc35-6985ab2df0c0" />






---

# 🎯 Future Improvements

- Authentication
- Code History
- Multiple AI Model Support
- Dark/Light Theme
- File Upload
- GitHub Repository Analysis
- PDF Export Improvements
- Multi-language Support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👩‍💻 Author

**Kashvi Dua**

GitHub:
https://github.com/Kashvi039

LinkedIn:
https://www.linkedin.com/in/kashvi-dua-pu/

---

⭐ If you found this project useful, consider giving it a star!
