import tensorflow as tf
from tensorflow import keras
import os

model = keras.models.load_model("C:/Users/CHAMA COMPUTERS/Desktop/Data_Science/AI_ML/DeepLearning/PotatoDiseaseClassificationCNN/-Potato_Disease_Classification_CNN/models/3.h5")


model.export("C:/Users/CHAMA COMPUTERS/Desktop/Data_Science/AI_ML/DeepLearning/PotatoDiseaseClassificationCNN/-Potato_Disease_Classification_CNN/models/3")



