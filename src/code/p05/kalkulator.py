while True:
    operasi = input("Operasi: ")
    if operasi == 'q':
        print("Bye!")
        break
    a = float(input("Angka 1: "))
    b = float(input("Angka 2: "))
    if operasi == '+':
        print(f"Hasil: {a + b}")
    elif operasi == '-':
        print(f"Hasil: {a - b}")
