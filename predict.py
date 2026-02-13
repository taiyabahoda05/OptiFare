import sys
import joblib
import pandas as pd

model = joblib.load("model.pkl")
city_encoder = joblib.load("city.pkl")
time_encoder = joblib.load("time.pkl")

distance = float(sys.argv[1])
city = sys.argv[2]
time = sys.argv[3]

city_val = city_encoder.transform([city])[0]
time_val = time_encoder.transform([time])[0]

features = pd.DataFrame(
    [[distance, city_val, time_val]],
    columns=["distance", "city", "time"],
)
prediction = model.predict(features)

print(round(float(prediction[0]), 2))
