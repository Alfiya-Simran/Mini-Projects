# 📄 AI-Powered Resume Screening Tool

An interactive Streamlit application that automatically ranks resumes based on a given job description using natural language processing (NLP).

## 🚀 Features

- Upload multiple **PDF resumes**.
- Paste or load a sample **Job Description**.
- Extracts and analyzes resume content using a custom parser.
- Uses a semantic similarity model to **rank resumes** by relevance.
- Download a **CSV** of ranked resumes with their scores.

---

## 🛠️ Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/resume-screening-app.git
cd resume-screening-app
```

2. **Create a Virtual Environment (Optional but Recommended)**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install Requirements**

```bash
pip install -r requirements.txt
```

4. **Running the App**
```bash
streamlit run app.py
```
---

## 📁 Folder Structure

resume-screening-app/

│ 

├── app.py  # Main Streamlit app

├── resume_parser.py           # PDF text extraction

├── job_matcher.py             # Resume ranking logic

├── requirements.txt           # Python dependencies

├── sample_job.txt             # Optional pre-filled job description

└── uploads/                   # Folder to temporarily store uploaded resumes

---

## 📌 Notes
- The resumes must be in PDF format.

- A sample job description can be placed in sample_job.txt and it will auto-load in the app.

- All uploaded resumes are stored temporarily in the uploads/ directory.

- Ranked results are saved as ranked_resumes.csv.


