import pandas as pd
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error
import joblib

from mongodb import load_data

# STEP 1 - load from MongoDB
data = load_data()

if data.empty:
    print("No data to train")
    exit()

print("Columns:", list(data.columns))

# STEP 2 - keep only needed columns
data = data[["distance", "city", "time", "best_fare"]]
data = data.dropna()

# convert numeric columns
data["distance"] = data["distance"].astype(float)
data["best_fare"] = data["best_fare"].astype(float)

# STEP 3 - encode text
city_encoder = LabelEncoder()
time_encoder = LabelEncoder()

data["city"] = city_encoder.fit_transform(data["city"])
data["time"] = time_encoder.fit_transform(data["time"])

# STEP 4 - features & target
X = data[["distance", "city", "time"]]
y = data["best_fare"]

# STEP 5 - split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# STEP 6 - train
model = DecisionTreeRegressor(random_state=42)
model.fit(X_train, y_train)

# STEP 7 - validation
preds = model.predict(X_test)
mae = mean_absolute_error(y_test, preds)
print("Model MAE:", round(mae, 2))

# STEP 8 - save model and encoders
joblib.dump(model, "model.pkl")
joblib.dump(city_encoder, "city.pkl")
joblib.dump(time_encoder, "time.pkl")

print("AI trained successfully from MongoDB")
