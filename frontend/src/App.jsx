import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    gender: "Male",
    SeniorCitizen: 1,
    Partner: "No",
    Dependents: "No",
    tenure: 12,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "Fiber optic",
    OnlineSecurity: "No",
    OnlineBackup: "Yes",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "Yes",
    StreamingMovies: "Yes",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 70.5,
    TotalCharges: 850,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "tenure" ||
      name === "MonthlyCharges" ||
      name === "TotalCharges"
    ) {
      setForm((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
    } else if (name === "SeniorCitizen") {
      setForm((prev) => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const payload = {
        ...form,
        SeniorCitizen: Number(form.SeniorCitizen),
        tenure: Number(form.tenure),
        MonthlyCharges: Number(form.MonthlyCharges),
        TotalCharges: Number(form.TotalCharges),
      };

      console.log("Sending payload:", payload);

      const response = await axios.post(
        "http://localhost:8000/predict",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setResult(response.data);
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setResult({
        error: "An error occurred while making the prediction.",
        details: error.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>📊 Customer Churn Prediction</h1>

      <form onSubmit={handleSubmit} className="prediction-form">
        {/* Personal Information Section */}
        <div className="form-section">
          <div className="section-title">👤 Personal Information</div>

          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>Senior Citizen</label>
            <select
              name="SeniorCitizen"
              onChange={handleChange}
              value={form.SeniorCitizen}
            >
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Partner</label>
            <select name="Partner" onChange={handleChange} value={form.Partner}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>Dependents</label>
            <select
              name="Dependents"
              onChange={handleChange}
              value={form.Dependents}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tenure (months)</label>
            <input
              type="number"
              name="tenure"
              value={form.tenure}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Enter tenure in months"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="form-section">
          <div className="section-title">📱 Services</div>

          <div className="form-group">
            <label>Phone Service</label>
            <select
              name="PhoneService"
              onChange={handleChange}
              value={form.PhoneService}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-group">
            <label>Multiple Lines</label>
            <select
              name="MultipleLines"
              onChange={handleChange}
              value={form.MultipleLines}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No phone service">No phone service</option>
            </select>
          </div>

          <div className="form-group">
            <label>Internet Service</label>
            <select
              name="InternetService"
              onChange={handleChange}
              value={form.InternetService}
            >
              <option value="DSL">DSL</option>
              <option value="Fiber optic">Fiber optic</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Security & Support Section */}
        <div className="form-section">
          <div className="section-title">🔒 Security & Support</div>

          <div className="form-group">
            <label>Online Security</label>
            <select
              name="OnlineSecurity"
              onChange={handleChange}
              value={form.OnlineSecurity}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">No internet service</option>
            </select>
          </div>

          <div className="form-group">
            <label>Online Backup</label>
            <select
              name="OnlineBackup"
              onChange={handleChange}
              value={form.OnlineBackup}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">No internet service</option>
            </select>
          </div>

          <div className="form-group">
            <label>Device Protection</label>
            <select
              name="DeviceProtection"
              onChange={handleChange}
              value={form.DeviceProtection}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">No internet service</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tech Support</label>
            <select
              name="TechSupport"
              onChange={handleChange}
              value={form.TechSupport}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">No internet service</option>
            </select>
          </div>
        </div>

        {/* Entertainment & Contract Section */}
        <div className="form-section">
          <div className="section-title">🎬 Entertainment & Contract</div>

          <div className="form-group">
            <label>Streaming TV</label>
            <select
              name="StreamingTV"
              onChange={handleChange}
              value={form.StreamingTV}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">No internet service</option>
            </select>
          </div>

          <div className="form-group">
            <label>Streaming Movies</label>
            <select
              name="StreamingMovies"
              onChange={handleChange}
              value={form.StreamingMovies}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">No internet service</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contract</label>
            <select
              name="Contract"
              onChange={handleChange}
              value={form.Contract}
            >
              <option value="Month-to-month">Month-to-month</option>
              <option value="One year">One year</option>
              <option value="Two year">Two year</option>
            </select>
          </div>

          <div className="form-group">
            <label>Paperless Billing</label>
            <select
              name="PaperlessBilling"
              onChange={handleChange}
              value={form.PaperlessBilling}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Billing Information Section */}
        <div className="form-section">
          <div className="section-title">💰 Billing Information</div>

          <div className="form-group">
            <label>Payment Method</label>
            <select
              name="PaymentMethod"
              onChange={handleChange}
              value={form.PaymentMethod}
            >
              <option value="Electronic check">Electronic check</option>
              <option value="Mailed check">Mailed check</option>
              <option value="Bank transfer (automatic)">
                Bank transfer (automatic)
              </option>
              <option value="Credit card (automatic)">
                Credit card (automatic)
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Monthly Charges ($)</label>
            <input
              type="number"
              step="0.01"
              name="MonthlyCharges"
              value={form.MonthlyCharges}
              onChange={handleChange}
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Total Charges ($)</label>
            <input
              type="number"
              step="0.01"
              name="TotalCharges"
              value={form.TotalCharges}
              onChange={handleChange}
              min="0"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Button Container */}
        <div className="button-container">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : "Predict Churn"}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Analyzing customer data...</div>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="result-container">
            <h3>📋 Prediction Result</h3>
            <div
              className={`result-content ${result.error ? "error-message" : ""}`}
            >
              {result.error ? (
                <>
                  <p>
                    <strong>Error:</strong> {result.error}
                  </p>
                  {result.details && (
                    <div className="error-details">
                      <pre>{JSON.stringify(result.details, null, 2)}</pre>
                    </div>
                  )}
                </>
              ) : (
                <pre>{JSON.stringify(result, null, 2)}</pre>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
