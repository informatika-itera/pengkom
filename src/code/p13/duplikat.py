import pandas as pd

df = pd.read_csv("transaksi.csv")
print(df.duplicated().sum())
df = df.drop_duplicates()
print(len(df))
