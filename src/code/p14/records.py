import pandas as pd

siswa = [
    {"nama": "Ani", "nilai": 80},
    {"nama": "Budi", "nilai": 70},
]
for s in siswa:
    print(s["nama"], s["nilai"])
print(pd.DataFrame(siswa))
