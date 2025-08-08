# 📰 Fake News Detection Using Machine Learning
This project focuses on detecting fake news using natural language processing (NLP) techniques and machine learning models. The goal is to classify news articles as real or fake based on their content.

## 📌 Features
- Preprocessing of news text using NLTK

- Feature extraction using TF-IDF Vectorizer

- Binary classification using Logistic Regression

- Evaluation using accuracy, confusion matrix, and classification report

## 🛠️ Tech Stack
1. Python

2. Jupyter Notebook

3. Scikit-learn

4. NLTK (Natural Language Toolkit)

5. Pandas, NumPy, Matplotlib

6. TF-IDF Vectorizer

## 📁 Dataset
- Dataset Used: [Fake and Real News Dataset](https://drive.google.com/drive/folders/1LvzK4lNBLTlvOY6QjCkettFvvKQX-68x?usp=sharing)

- Files:

  - Fake.csv

  - True.csv

## 🚀 How to Run
1. **Clone the Repository**
```bash
git clone https://github.com/Alfiya-Simran/3.fake-news-detector.git
cd 3.fake-news-detector
```
2. **Install Dependencies**
```bash
pip install -r requirements.txt
```
3. **Download the Dataset**
- Download the dataset from the Kaggle link and place the Fake.csv and True.csv files in the project directory.

4. **Run the Notebook**
- Launch Jupyter Notebook and open:
```bash
jupyter notebook fake_news_detection.ipynb
```

## 🧠 Model Overview
- Preprocessing Steps:

  - Lowercasing

  - Removing punctuation and stopwords

  - Tokenization using NLTK

- Feature Extraction:

  - TF-IDF Vectorizer

- Model:

  - Logistic Regression

  - Evaluation:

  - Accuracy Score

  - Confusion Matrix

  - Precision, Recall, F1-score

## 📊 Results
- Accuracy Achieved: ~98%

- Insights: Logistic Regression with TF-IDF is effective for detecting fake news with high accuracy and interpretability.

