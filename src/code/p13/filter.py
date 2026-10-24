import pandas as pd

df = pd.read_csv("nilai_mhs.csv")
lulus = df[df["Nilai"] >= 60]
tampil = lulus[["Nama", "Nilai"]]
print(tampil.head(3))
print(len(lulus))
