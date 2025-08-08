# train_model.py
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.layers import AveragePooling2D, Dropout, Flatten, Dense, Input
from tensorflow.keras.models import Model
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelBinarizer
from sklearn.metrics import classification_report
import numpy as np
import os
import cv2

# Setup
INIT_LR = 1e-4
EPOCHS = 10
BS = 32
DIRECTORY = "dataset"
CATEGORIES = ["with_mask", "without_mask"]

data = []
labels = []

# Load images
for category in CATEGORIES:
    path = os.path.join(DIRECTORY, category)
    for img in os.listdir(path):
        img_path = os.path.join(path, img)
        image = cv2.imread(img_path)
        image = cv2.resize(image, (224, 224))
        data.append(image)
        labels.append(category)

# Convert
data = np.array(data, dtype="float32")
labels = np.array(labels)

lb = LabelBinarizer()
labels = lb.fit_transform(labels)
labels = to_categorical(labels)
data = preprocess_input(data)

# Train/test split
(trainX, testX, trainY, testY) = train_test_split(data, labels, test_size=0.2, stratify=labels)

# Build model
baseModel = MobileNetV2(weights="imagenet", include_top=False, input_tensor=Input(shape=(224, 224, 3)))
headModel = baseModel.output
headModel = AveragePooling2D(pool_size=(7, 7))(headModel)
headModel = Flatten()(headModel)
headModel = Dense(128, activation="relu")(headModel)
headModel = Dropout(0.5)(headModel)
headModel = Dense(2, activation="softmax")(headModel)

model = Model(inputs=baseModel.input, outputs=headModel)

for layer in baseModel.layers:
    layer.trainable = False

model.compile(loss="binary_crossentropy", optimizer=Adam(learning_rate=INIT_LR), metrics=["accuracy"])

# Train
model.fit(trainX, trainY, batch_size=BS, epochs=EPOCHS, validation_data=(testX, testY))

# Save model
model.save("mask_detector.model.h5")
