import pandas as pd

df = pd.read_csv("nilai_mhs.csv")
print(df["Nilai"].isnull().sum())
bersih = df.dropna()
print(len(df), len(bersih))
