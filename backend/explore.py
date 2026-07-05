import pandas as pd

# Load the dataset
df = pd.read_csv("data/car_data.csv")

# 1. Basic shape and preview
print("Shape (rows, columns):", df.shape)
print("\nFirst 5 rows:")
print(df.head())

# 2. Column info - data types and missing values
print("\nColumn info:")
print(df.info())

# 3. Any missing values?
print("\nMissing values per column:")
print(df.isnull().sum())

# 4. Statistical summary of numeric columns
print("\nNumeric summary:")
print(df.describe())

# 5. Unique values in categorical columns
print("\nUnique Fuel_Type values:", df["Fuel_Type"].unique())
print("Unique Selling_type values:", df["Selling_type"].unique())
print("Unique Transmission values:", df["Transmission"].unique())
print("Number of unique car names:", df["Car_Name"].nunique())

# 6. Check for duplicate rows
print("\nDuplicate rows:", df.duplicated().sum())