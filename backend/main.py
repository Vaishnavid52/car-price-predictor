from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Load the trained model and the column order it expects
model = joblib.load("car_price_model.pkl")
model_columns = joblib.load("model_columns.pkl")

app = FastAPI(title="Car Price Prediction API")

# Allow our frontend (running on a different port) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development only - we'll restrict this later
    allow_methods=["*"],
    allow_headers=["*"],
)

# This defines exactly what data the frontend must send us
from pydantic import BaseModel, Field
from typing import Literal

class CarInput(BaseModel):
    present_price: float = Field(gt=0, le=200, description="Original price in lakhs")
    driven_kms: int = Field(ge=0, le=1000000)
    owner: int = Field(ge=0, le=5)
    car_age: int = Field(ge=0, le=50)
    fuel_type: Literal["Petrol", "Diesel", "CNG"]
    selling_type: Literal["Dealer", "Individual"]
    transmission: Literal["Manual", "Automatic"]

@app.get("/")
def home():
    return {"message": "Car Price Prediction API is running"}

@app.post("/predict")
def predict_price(car: CarInput):
    # Build a single row matching the exact columns the model was trained on
    input_data = {
        "Present_Price": car.present_price,
        "Driven_kms": car.driven_kms,
        "Owner": car.owner,
        "Car_Age": car.car_age,
        "Fuel_Type_Diesel": 1 if car.fuel_type == "Diesel" else 0,
        "Fuel_Type_Petrol": 1 if car.fuel_type == "Petrol" else 0,
        "Selling_type_Individual": 1 if car.selling_type == "Individual" else 0,
        "Transmission_Manual": 1 if car.transmission == "Manual" else 0,
    }

    # Arrange columns in the exact order the model expects
    input_df = pd.DataFrame([input_data])[model_columns]

    prediction = model.predict(input_df)[0]

    return {
        "predicted_price_lakhs": round(float(prediction), 2)
    }