import pandas as pd

df = pd.read_csv("mahasiswa.csv")
print(len(df[df["Umur"] > 20]))
