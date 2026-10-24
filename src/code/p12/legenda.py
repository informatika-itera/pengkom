import matplotlib.pyplot as plt

x = [1, 2, 3, 4]
a = [3, 5, 6, 9]
b = [2, 4, 7, 8]
plt.plot(x, a, label="Kelas A")
plt.plot(x, b, label="Kelas B")
plt.legend()
plt.grid(True)
plt.show()
