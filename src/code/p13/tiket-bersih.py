import pandas as pd

df = pd.read_csv("nilai_mhs.csv")
print(len(df.dropna()))
