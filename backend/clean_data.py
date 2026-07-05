import pandas as pd

# Load the raw dataset
df = pd.read_csv("data/car_data.csv")

# 1. Remove duplicate rows
df = df.drop_duplicates()

# 2. Create Car_Age instead of raw Year (current year - manufacture year)
current_year = 2026
df["Car_Age"] = current_year - df["Year"]
# Remove an extreme outlier (a ~92 lakh luxury car that skews the model)
df = df[df["Present_Price"] < 50]
df = df.drop("Year", axis=1)  # we don't need raw Year anymore

# 3. Convert text columns into numbers (one-hot encoding)
#    This turns e.g. Fuel_Type into separate 0/1 columns like Fuel_Type_Petrol, Fuel_Type_Diesel
df = pd.get_dummies(df, columns=["Fuel_Type", "Selling_type", "Transmission"], drop_first=True)

# 4. Drop Car_Name - too many unique values (98) to use directly as a feature
df = df.drop("Car_Name", axis=1)

# 5. Check the result
print("Cleaned data shape:", df.shape)
print("\nColumns now:", df.columns.tolist())
print("\nFirst 5 rows:")
print(df.head())

# 6. Save the cleaned data to a new CSV for the next phase (model training)
df.to_csv("data/car_data_cleaned.csv", index=False)
print("\nSaved cleaned data to data/car_data_cleaned.csv")