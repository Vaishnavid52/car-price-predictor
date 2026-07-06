# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🚗 Car Price Estimator

A full-stack machine learning web application that predicts a used car's resale price based on its features — trained on real-world car sales data, served through a FastAPI backend, and presented through a custom-designed, animated React frontend.

**🔗 Live demo:** https://car-price-predictor-eta.vercel.app
**🔗 API:** https://car-price-predictor-api-7lu2.onrender.com/docs

![Car Price Estimator preview](./preview.png)

## Overview

This project predicts the resale value of a used car (in ₹ lakhs) given details like its present showroom price, age, mileage, fuel type, seller type, and transmission — using a Random Forest Regression model trained on a dataset of 300+ car sales.

## Features

- **Data cleaning & feature engineering**: converts raw year into car age, one-hot encodes categorical fields, removes outliers
- **Model comparison**: evaluated Linear Regression vs. Random Forest, selected the stronger performer (R² = 0.86, MAE ≈ ₹0.97 lakhs)
- **Validated REST API**: FastAPI backend with strict input validation (Pydantic) and clear error responses
- **Custom frontend design**: dark luxury showroom theme, a rotating line-art car hero animation, and an animated speedometer-style gauge that sweeps to the predicted price
- **Fully deployed**: backend on Render, frontend on Vercel, connected end-to-end

## Tech Stack

**Machine Learning / Backend**
- Python, Pandas, scikit-learn
- FastAPI, Uvicorn, Pydantic

**Frontend**
- React (Vite)
- Plain CSS (custom design system — no UI framework)

**Deployment**
- Render (backend API)
- Vercel (frontend)

## Model Performance

| Model | R² Score | MAE (lakhs) |
|---|---|---|
| Linear Regression | 0.79 | 1.58 |
| **Random Forest (used)** | **0.86** | **0.97** |

## Project Structure
car-price-predictor/
├── backend/
│   ├── main.py                 # FastAPI app + prediction endpoint
│   ├── clean_data.py           # Data cleaning & feature engineering
│   ├── train_model.py          # Model training & evaluation
│   ├── car_price_model.pkl     # Trained model
│   └── data/
│       └── car_data.csv        # Source dataset
└── frontend/
└── src/
├── App.jsx             # Main page, form, gauge
├── Hero.jsx            # Animated hero section
└── *.css               # Styling

## Running Locally

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Dataset

Used car sales dataset with 301 records covering brand, year, selling price, present price, mileage, fuel type, seller type, transmission, and ownership history.

---

Built as a self-guided data science + full-stack project.