try:
    umur = int(input("Umur: "))
    print("Dua kali:", umur * 2)
except ValueError:
    print("Bukan angka")
