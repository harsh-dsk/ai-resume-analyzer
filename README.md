# AI Resume Analyzer

🚀 An AI-powered Resume Analyzer that evaluates resumes for ATS (Applicant Tracking System) compatibility using Google Gemini AI. Upload a PDF or DOCX resume and receive detailed ATS scoring, keyword analysis, strengths, weaknesses, and personalized improvement suggestions.

## 🌐 Live Demo

https://ai-resume-analyzer-mocha-one.vercel.app

## ✨ Features

* ATS Score Analysis
* Resume Keyword Detection
* Resume Strength Identification
* AI-Powered Improvement Suggestions
* PDF & DOCX Resume Upload
* Resume Content Extraction
* Skills Match Analysis
* Interactive Dashboard
* Responsive Design
* Modern UI with Animations
* Real-Time Resume Evaluation

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* React Router

### Backend

* Node.js
* Express.js
* Multer
* Mammoth
* PDF.js

### AI Integration

* Google Gemini AI

### Deployment

* Vercel
* Render

## 📸 Screenshots

### Home Page

![Home Page](./public/screenshots/home-page.png)

### Upload Page

![Upload Page](./public/screenshots/upload-page.png)

### Dashboard

![Dashboard](./public/screenshots/dashboard.png)

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/harsh-dsk/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### Frontend Setup

```bash
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm start
```

## 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

## ⚙️ How It Works

1. Upload a PDF or DOCX resume.
2. Backend extracts text using PDF.js and Mammoth.
3. Resume content is analyzed using Google Gemini AI.
4. ATS scores, keyword analysis, strengths, and suggestions are generated.
5. Results are displayed on an interactive dashboard.

## 🎯 Learning Outcomes

* Full Stack Development
* REST API Integration
* AI Application Development
* Prompt Engineering
* File Upload & Processing
* PDF Parsing
* Responsive UI Design
* Deployment with Vercel & Render

## 🔮 Future Improvements

* User Authentication
* Resume History Storage
* Database Integration
* Job Description Matching
* Resume Version Tracking
* Downloadable Reports

## 👨‍💻 Author

**Harshdeep Singh Khanuja**

GitHub: https://github.com/harsh-dsk

LinkedIn: https://linkedin.com/in/harsh-dsk

## 📄 License

This project is developed for educational and portfolio purposes.
