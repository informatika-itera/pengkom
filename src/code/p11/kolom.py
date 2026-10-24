import pandas as pd

usia = [20, 19, 21]
df = pd.DataFrame({"Usia": usia})
print(df["Usia"])
print(df["Usia"].mean())
