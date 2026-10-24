import pandas as pd

data = {"Nama": ["Ani", "Budi"],
        "Usia": [20, 19]}
df = pd.DataFrame(data)
print(df["Usia"].max())
