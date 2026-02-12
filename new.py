from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel , Field
import pickle
import pandas as pd
import joblib


encoders = joblib.load("model/encoders.pkl")

with open("model/customer_churn_model.pkl", "rb") as f:
    loaded_obj = pickle.load(f)
    
    
    if isinstance(loaded_obj, dict):
            ml_model = loaded_obj["model"]   # or correct key
    else:
            ml_model = loaded_obj

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    gender: str = Field(example="Male")
    SeniorCitizen:int = Field(example=0)
    Partner: str = Field(example="Yes")
    Dependents: str = Field(example="No")
    tenure: int = Field(example=12)
    PhoneService: str = Field(example="Yes")
    MultipleLines: str = Field(example="No")
    InternetService: str = Field(example="Fiber optic")
    OnlineSecurity: str = Field(example="No")
    OnlineBackup: str = Field(example="Yes")
    DeviceProtection: str = Field(example="No")
    TechSupport: str = Field(example="Yes")
    StreamingTV: str =  Field(example="No")
    StreamingMovies: str = Field(example="Yes")
    Contract: str = Field(example="Month-to-month")
    PaperlessBilling: str = Field(example="Yes")
    PaymentMethod: str = Field(example="Electronic check")
    MonthlyCharges: float = Field(example=70.35)
    TotalCharges: float = Field(example=1397.475)

               
@app.post('/predict')        
def predict(data: Item):
    try:
        data_dict = data.dict()
        
        for col in encoders:
            if col in data_dict:
                data_dict[col] = encoders[col].transform([data_dict[col]])[0]
        
        
        df = pd.DataFrame([data_dict])   
             
        print("TYPE BEFORE PREDICT:", type(ml_model))
        
        prediction = ml_model.predict(df)[0]
        
        if prediction == 1:
            message = "Customer is likely to churn"
        else:
            message = "Customer is not likely to churn"
              
        return JSONResponse(content={"prediction": int(prediction), "message": message})
    except Exception as e:  
        return JSONResponse(content={"error": str(e)}, status_code=500)