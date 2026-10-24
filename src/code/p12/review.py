import pandas as pd

nilai = [80, 90, 70]
df = pd.DataFrame({"Nilai": nilai})
print(df["Nilai"].mean())
