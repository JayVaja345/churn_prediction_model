FROM python:3.10-slim

# COPY . /churn_prediction

#Work Directory
WORKDIR /churn_prediction

# Copy requirements first (better caching)
COPY requirements.txt .

# Installing the dependenciesss
RUN pip install -r requirements.txt

# Now copy rest of project (app + model)
COPY . .

#Exposing port for the API
EXPOSE 80

# Command to run the Api
CMD [ "uvicorn" , "new:app", "--host", "0.0.0.0", "--port" , "80" ]



