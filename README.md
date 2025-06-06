# Ritematch: AI-Powered Job Matching & Resume Tailoring Portal

**Ritematch** is a cutting-edge full-stack application that leverages AI and Natural Language Processing to intelligently match users with job opportunities, tailor resumes to specific job descriptions, and provide actionable career insights. Built with a Django backend and React frontend, Ritematch provides a seamless experience for job seekers and professionals alike.

---

## ✨ Features

### 🤖 AI-Driven Functionality

- **Smart Job Matching**: Uses NLP and cosine similarity to compute match scores between your resume and job descriptions.
- **Resume Tailoring Assistant**: Tailor your resume to specific job descriptions using generative AI (Gemini/OpenAI).
- **ATS Optimization**: Resume output is designed to work well with Applicant Tracking Systems.
- **Professional Summary & Experience Rewriting**: Enhanced phrasing and keyword enrichment powered by LLM prompts.

### 🚪 User Authentication

- Secure Signup & Login
- Token-based session management using Django Rest Framework (DRF)

### 📂 Resume Utilities

- Upload your resume in PDF/DOC/DOCX formats
- Extract and display resume content
- Preview both original and AI-tailored resumes side by side
- Download tailored resume in **PDF** or **DOCX** formats

### 📈 Job Tools

- Fetch jobs from APIs and internal DB
- Display job matches with match scores
- Personalized job recommendations

### 🛠️ Tech Stack

- **Frontend**: React, Material UI, Tailwind CSS
- **Backend**: Django, Django Rest Framework, Python
- **AI Models**: Google Gemini / OpenAI GPT-4o
- **Deployment**: Firebase (frontend), Django dev server (backend)

---

## 📅 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/RiteMatch.git
cd RiteMatch
```

### 2. Setup Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend is now available at: [http://localhost:8000/](http://localhost:8000/)

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

Frontend runs at: [http://localhost:3000/](http://localhost:3000/)

---

## 📚 Usage Guide

### 📄 Resume Tailoring

- Upload your resume
- Paste a job description
- Click **Tailor Resume**
- View side-by-side previews and download as PDF/DOCX

### 🔢 Job Matching

- Paste your skills
- Get a ranked list of jobs with cosine similarity scores

---

## 🛠️ API Endpoints

| Endpoint               | Method | Description                               |
| ---------------------- | ------ | ----------------------------------------- |
| `/user/signup/`        | POST   | Register a new user                       |
| `/user/signin/`        | POST   | Authenticate a user                       |
| `/user/upload-resume/` | POST   | Upload and extract resume content         |
| `/jobs/`               | GET    | Retrieve job listings                     |
| `/match/skills/`       | POST   | Get job match scores                      |
| `/api/tailor-resume/`  | POST   | Tailor resume to provided job description |

---

## 🚀 Deployment

### Frontend (Firebase Hosting)

```bash
cd frontend
npm run build
npm install -g firebase-tools
firebase login
firebase init
# Select "Hosting" and choose build/ as public directory
firebase deploy
```

---

## 📅 Project Structure

```
RiteMatch/
├── backend/            # Django project
│   ├── user/           # User auth & resume handling
│   ├── tailorresume/   # AI resume tailoring logic
│   └── ai_agent/       # AI-based job scoring
├── frontend/           # React frontend UI
└── README.md           # Project docs
```

---

## 📊 Contributions & Contact

For feedback, suggestions, or collaboration:

**Kiran Devihosur**  
Email: [kirandevihosur74@gmail.com](mailto:kirandevihosur74@gmail.com)  
Portfolio: [My Portfolio](https://kirandevihosur.com/)

Happy Building 🚀 and Good Luck Job Hunting! 💼
