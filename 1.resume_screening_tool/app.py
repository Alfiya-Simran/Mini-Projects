# app.py
import streamlit as st
import os
from resume_parser import extract_text_from_pdf
from job_matcher import rank_resumes
import pandas as pd

st.title("📄 AI-Powered Resume Screening Tool")

# ✅ Load sample job description if available
default_job_desc = ""
if os.path.exists("sample_job.txt"):
    with open("sample_job.txt", "r") as f:
        default_job_desc = f.read()

# ✅ Pre-fill the text area with default job description
job_desc = st.text_area("Paste Job Description", value=default_job_desc, height=200)

uploaded_files = st.file_uploader("Upload Resumes (PDF)", accept_multiple_files=True)

if st.button("Rank Resumes"):
    if job_desc and uploaded_files:
        resumes = []
        for f in uploaded_files:
            with open(os.path.join("uploads", f.name), "wb") as out:
                out.write(f.read())
            text = extract_text_from_pdf(f"uploads/{f.name}")
            resumes.append(text)
        
        scores = rank_resumes(resumes, job_desc)
        df = pd.DataFrame({
            "File": [f.name for f in uploaded_files],
            "Score": scores
        }).sort_values(by="Score", ascending=False)
        
        st.write("### Ranked Resumes")
        st.dataframe(df)
        df.to_csv("ranked_resumes.csv", index=False)
        st.download_button("📥 Download CSV", data=df.to_csv(index=False), file_name="ranked_resumes.csv")
    else:
        st.error("Please enter job description and upload resumes.")
