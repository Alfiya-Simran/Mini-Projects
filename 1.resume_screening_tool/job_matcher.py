# job_matcher.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def rank_resumes(resume_texts, job_description):
    docs = resume_texts + [job_description]
    tfidf = TfidfVectorizer().fit_transform(docs)
    scores = cosine_similarity(tfidf[:-1], tfidf[-1:])
    return scores.flatten()
