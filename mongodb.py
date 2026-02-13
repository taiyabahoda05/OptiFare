from pymongo import MongoClient
import pandas as pd

def load_data():
    client = MongoClient("mongodb://localhost:27017/")
    db = client["optifare"]
    collection = db["comparisons"]

    docs = list(collection.find({}, {"_id": 0}))

    if len(docs) == 0:
        print("No MongoDB data found")
        return pd.DataFrame()

    df = pd.DataFrame(docs)

    # --------- FLATTEN NESTED JSON ----------
    df["best_name"] = df["best"].apply(lambda x: x.get("name") if isinstance(x, dict) else None)
    df["best_fare"] = df["best"].apply(lambda x: x.get("fare") if isinstance(x, dict) else None)

    # clean columns
    df = df.drop(columns=["best", "fares"], errors="ignore")

    print("Loaded rows:", len(df))
    return df
