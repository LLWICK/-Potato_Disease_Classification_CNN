from fastapi import FastAPI, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from tensorflow import keras

app = FastAPI()

model = tf.keras.models.load_model("C:/Users/CHAMA COMPUTERS/Desktop/Data_Science/AI_ML/DeepLearning/PotatoDiseaseClassificationCNN/-Potato_Disease_Classification_CNN/models/3.h5")


labels = ['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']


@app.get("/ping")
def read_root():
    return {"Hello": "World"}

def read_file_as_image(data)-> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict/")
async def predict(file: UploadFile):
  

    image = read_file_as_image(await file.read())
    image_batch = np.expand_dims(image,0)
    prediction = model.predict(image_batch)
    ind = np.argmax(prediction[0])
    accuracy = round(100*np.max(prediction[0]))
    return {"Prediction": labels[ind], "Accuracy": accuracy}


if __name__ == "main":
    uvicorn.run(app, host="localhost", port=8000)