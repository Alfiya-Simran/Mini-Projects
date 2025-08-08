# 🖼️ Image Caption Generator using Deep Learning
This project builds a deep learning model that generates natural language captions for images using a combination of Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs).

## 📌 Features
- Uses InceptionV3 (CNN) to extract image features

- Text sequences generated with LSTM-based RNN

- Trained on the Flickr8k dataset

- Tokenization and padding for caption sequences

- Generation of new captions based on image content

## 🧠 Model Architecture
- **Encoder**: Pre-trained InceptionV3 model extracts high-level image features.

- **Decoder**: LSTM-based RNN that takes image features + input text and predicts the next word in the sequence.

- **Embedding Layer**: Converts words to vector representations.

- **Tokenizer**: Converts text to integer sequences for training.

## 🛠️ Tech Stack
1. Python

2. TensorFlow / Keras

3. NumPy / Pandas / Matplotlib

4. NLTK (Natural Language Toolkit)

5. Pillow (for image handling)

# 📁 Dataset
- Flickr8k: A dataset of 8000 images each with 5 human-written captions.

- Download from: https://www.kaggle.com/datasets/adityajn105/flickr8k

## 🚀 How to Run
1. **Clone the Repository**
```bash
git clone https://github.com/Alfiya-Simran/4.image_caption_generator.git
cd 4.image_caption_generator
```
2. **Install Requirements**
```bash
pip install -r requirements.txt
```
3. **Prepare Dataset**
- Download the Flickr8k dataset and extract:

  - Flicker8k_Dataset/ (images)

  - Flickr8k.token.txt (captions)

- Place them in your project directory.

4. **Run the Notebook**
Launch Jupyter and open the notebook:
```bash
jupyter notebook caption_generator.ipynb
```
### Follow the cells step-by-step:

1. Load data and preprocess captions

2. Extract image features using InceptionV3

3. Tokenize and pad sequences

4. Train the model

5. Generate captions for new images

## 🧪 Results
The model learns to generate relevant captions like:

_🖼️ "A girl in a pink dress is talking to a pole"_

You can test it by loading any image from the dataset and generating a caption using the trained model.

## 📈 Training Summary
- Trained on 3000+ images (due to memory constraints)

- ~10 Epochs for initial convergence

- Loss reduced from ~5.6 to ~1.7

## 📦 Output
- model.h5: Saved trained model

- tokenizer.pkl: Saved tokenizer for caption generation

- features.pkl: Precomputed image features


