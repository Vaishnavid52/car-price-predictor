import { useState, useEffect, useRef } from "react";
import Hero from "./Hero";
import "./App.css";

function Gauge({ value, max }) {
  const clamped = Math.min(Math.max(value, 0), max);
  const targetAngle = -90 + (clamped / max) * 180;
  const targetDash = (clamped / max) * 283;

  const [angle, setAngle] = useState(-90);
  const [dash, setDash] = useState(0);

  useEffect(() => {
    setAngle(-90);
    setDash(0);
    const t = setTimeout(() => {
      setAngle(targetAngle);
      setDash(targetDash);
    }, 60);
    return () => clearTimeout(t);
  }, [targetAngle, targetDash]);

  return (
    <div className="gauge">
      <svg viewBox="0 0 200 110" className="gauge-svg">
        <path d="M 10 100 A 90 90 0 0 1 190 100" className="gauge-track" />
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          className="gauge-fill"
          style={{ strokeDasharray: `${dash} 283` }}
        />
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="24"
          className="gauge-needle"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <circle cx="100" cy="100" r="6" className="gauge-hub" />
      </svg>
      <div className="gauge-scale">
        <span>0</span>
        <span>{max} L</span>
      </div>
    </div>
  );
}

// Adds a fade-up-into-view effect when an element scrolls into the viewport
function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function App() {
  const [form, setForm] = useState({
    present_price: "",
    driven_kms: "",
    owner: "0",
    car_age: "",
    fuel_type: "Petrol",
    selling_type: "Dealer",
    transmission: "Manual",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formRevealRef = useReveal();
  const resultRevealRef = useReveal();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("https://car-price-predictor-api-7lu2.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          present_price: parseFloat(form.present_price),
          driven_kms: parseInt(form.driven_kms),
          owner: parseInt(form.owner),
          car_age: parseInt(form.car_age),
          fuel_type: form.fuel_type,
          selling_type: form.selling_type,
          transmission: form.transmission,
        }),
      });

      if (!response.ok) throw new Error("Prediction failed");

      const data = await response.json();
      setPrediction(data.predicted_price_lakhs);
    } catch (err) {
      setError("Could not reach the valuation service. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  const gaugeMax = Math.max(40, Math.ceil((prediction || 0) * 1.2));

  return (
    <div className="page">
      <div className="backdrop-glow" />

      <Hero />

      <div className="layout" id="appraisal">
        <form
          ref={formRevealRef}
          className="panel form-panel reveal reveal-left"
          onSubmit={handleSubmit}
        >
          <h2 className="panel-title">Vehicle Details</h2>

          <div className="field-grid">
            <label className="field">
              <span>Present Price (₹ lakhs)</span>
              <input
                type="number"
                step="0.01"
                name="present_price"
                placeholder="e.g. 9.85"
                value={form.present_price}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Kilometers Driven</span>
              <input
                type="number"
                name="driven_kms"
                placeholder="e.g. 42000"
                value={form.driven_kms}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Car Age (years)</span>
              <input
                type="number"
                name="car_age"
                placeholder="e.g. 6"
                value={form.car_age}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field">
              <span>Previous Owners</span>
              <select name="owner" value={form.owner} onChange={handleChange}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label>

            <label className="field">
              <span>Fuel Type</span>
              <select name="fuel_type" value={form.fuel_type} onChange={handleChange}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
              </select>
            </label>

            <label className="field">
              <span>Seller Type</span>
              <select name="selling_type" value={form.selling_type} onChange={handleChange}>
                <option value="Dealer">Dealer</option>
                <option value="Individual">Individual</option>
              </select>
            </label>

            <label className="field">
              <span>Transmission</span>
              <select name="transmission" value={form.transmission} onChange={handleChange}>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Valuing..." : "Estimate Price"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <div ref={resultRevealRef} className="panel result-panel reveal reveal-right">
          <h2 className="panel-title">Valuation</h2>

          {prediction === null && !loading && (
            <div className="result-empty">
              <p>Your estimate will appear here once you submit the form.</p>
            </div>
          )}

          {loading && (
            <div className="result-empty">
              <p>Calculating valuation...</p>
            </div>
          )}

          {prediction !== null && !loading && (
            <div className="result-value">
              <Gauge value={prediction} max={gaugeMax} />
              <span className="result-label">Estimated Market Value</span>
              <span className="result-amount">
                ₹ {prediction} <span className="result-unit">Lakhs</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;