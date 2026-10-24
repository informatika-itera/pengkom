kata = ["apel", "pir", "apel"]
hitung = {}
for k in kata:
    hitung[k] = hitung.get(k, 0) + 1
print(hitung)
