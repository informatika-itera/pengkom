while True:
    try:
        a = int(input("Angka: "))
        break
    except ValueError:
        print("Bukan angka, ulangi")
print("Kamu mengetik", a)
