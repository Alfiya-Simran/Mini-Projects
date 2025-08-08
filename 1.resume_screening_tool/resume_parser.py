# resume_parser.py
import spacy
from pathlib import Path

nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(pdf_path):
    import fitz  # PyMuPDF
    doc = fitz.open(pdf_path)
    text = "\n".join([page.get_text() for page in doc])
    return text

def parse_resume(text):
    doc = nlp(text)
    return {
        "text": text,
        "tokens": [token.text for token in doc],
    }
