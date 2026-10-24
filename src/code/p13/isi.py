import pandas as pd

df = pd.read_csv("nilai_mhs.csv")
nilai = df["Nilai"]
rata = nilai.mean()
df["Nilai"] = nilai.fillna(rata)
print(round(rata, 1))
print(df["Nilai"].isnull().sum())
