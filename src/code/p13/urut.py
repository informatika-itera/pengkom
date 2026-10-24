import pandas as pd

df = pd.read_csv("nilai_mhs.csv")
urut = df.sort_values(
    "Nilai", ascending=False
)
tampil = urut[["Nama", "Nilai"]]
print(tampil.head(3))
