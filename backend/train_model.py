import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error
import joblib

# 1. Load the cleaned data
df = pd.read_csv("data/car_data_cleaned.csv")

# 2. Split into features (X) and target (y)
#    X = everything the model uses to guess the price
#    y = the actual price (what we want to predict)
X = df.drop("Selling_Price", axis=1)
y = df["Selling_Price"]

print("Features used:", X.columns.tolist())

# 3. Split into training set (80%) and testing set (20%)
#    The model learns from the training set, then we check its accuracy on the testing set (data it hasn't seen)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training on {len(X_train)} cars, testing on {len(X_test)} cars")

# 4. Train Model 1: Linear Regression (simple baseline)
lr_model = LinearRegression()
lr_model.fit(X_train, y_train)
lr_predictions = lr_model.predict(X_test)

print("\n--- Linear Regression Results ---")
print("R2 Score:", r2_score(y_test, lr_predictions))  # closer to 1.0 = better
print("Mean Absolute Error:", mean_absolute_error(y_test, lr_predictions), "lakhs")

# 5. Train Model 2: Random Forest (usually stronger, handles non-linear patterns better)
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)
rf_predictions = rf_model.predict(X_test)

print("\n--- Random Forest Results ---")
print("R2 Score:", r2_score(y_test, rf_predictions))
print("Mean Absolute Error:", mean_absolute_error(y_test, rf_predictions), "lakhs")

# 6. Save the better model (Random Forest, usually) so our backend can use it later
joblib.dump(rf_model, "car_price_model.pkl")
joblib.dump(X.columns.tolist(), "model_columns.pkl")  # save column order too - important!

print("\nModel saved as car_price_model.pkl")