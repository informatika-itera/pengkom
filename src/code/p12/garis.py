import matplotlib.pyplot as plt

bulan = [1, 2, 3, 4, 5, 6]
jual = [10, 20, 25, 30, 50, 45]
plt.plot(bulan, jual, marker="o")
plt.title("Penjualan Bulanan")
plt.xlabel("Bulan")
plt.ylabel("Penjualan (juta)")
plt.show()
