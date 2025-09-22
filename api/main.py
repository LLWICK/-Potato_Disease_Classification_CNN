from fastapi import FastAPI, UploadFile
import uvicorn

app = FastAPI()

@app.get("/ping")
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
async def predict(file: UploadFile):
    return {"filename": file.filename}


if __name__ == "main":
    uvicorn.run(app, host="localhost", port=8000)