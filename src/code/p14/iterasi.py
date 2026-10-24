nilai = {"Ani": 80, "Budi": 70}
for nama, n in nilai.items():
    print(f"{nama}: {n}")
total = sum(nilai.values())
print(total / len(nilai))
