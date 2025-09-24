from fastapi import FastAPI, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import requests

app = FastAPI()

endpoint = "http://localhost:8501/v1/models/potatoes_model:predict"

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

    json_data = {"instances": image_batch.tolist()}
    response = requests.post(endpoint,json=json_data)

    predictions = np.array(response.json()["predictions"][0])
    predicted_class = np.argmax(predictions)
    accuracy = np.max(predictions)


    return {"Prediction": predicted_class, "Accuracy": accuracy}


if __name__ == "main":
    uvicorn.run(app, host="localhost", port=8000)