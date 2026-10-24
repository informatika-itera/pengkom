import pandas as pd

df = pd.read_csv("nilai_mhs.csv")
nilai = df["Nilai"]
ok = (nilai >= 60) & (nilai < 80)
cukup = df[ok]
print(len(cukup))
