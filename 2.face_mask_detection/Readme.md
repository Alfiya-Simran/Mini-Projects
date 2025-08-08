# 😷 Real-Time Face Mask Detection System
This project detects whether people are wearing a face mask in real-time using a webcam. It uses a pre-trained deep learning model (MobileNetV2) along with OpenCV and TensorFlow/Keras for face detection and mask classification.

---

## 🧠 Features
- Real-time face detection via webcam

- Classification of detected faces as Mask or No Mask

- Visual feedback with bounding boxes and labels

- Uses lightweight MobileNetV2 for faster inference

---

## 🛠️ Tech Stack
- Python

- OpenCV

- TensorFlow / Keras

- NumPy

- Haar Cascade Classifier

- MobileNetV2 (for mask detection model)

---

## 📁 Project Structure
```bash
.
├── detect_mask.py              # Main application script
├── mask_detector.model.h5      # Trained face mask detection model
├── haarcascade_frontalface_default.xml  # Pre-trained Haar Cascade face detector
```

---

## 🚀 Getting Started
1. **Clone the Repository**
```bash
git clone https://github.com/Alfiya-Simran/2.face-mask-detection.git
cd 2.face-mask-detection
```
2. **Install Dependencies**
```bash
pip install -r requirements.txt
```
3. **Download Required Files**
- haarcascade_frontalface_default.xml: Download from OpenCV GitHub

- mask_detector.model.h5: Your pre-trained model (upload to project root)

---

## 🎮 Usage
Run the main script:
```bash
python detect_mask.py
```
> Press q to exit the webcam window.

---

## 📝 Notes
- Make sure your webcam is working and accessible.

- This model expects input images of size 224x224.
