import pandas as pd

df = pd.read_csv("nilai_mhs.csv")
df = df.fillna(0)
df["Status"] = "Tidak lulus"
lulus = df["Nilai"] >= 60
df.loc[lulus, "Status"] = "Lulus"
kolom = ["Nama", "Status"]
hasil = df[kolom].head(3)
print(hasil.to_csv(index=False))
