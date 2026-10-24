import matplotlib.pyplot as plt

plt.figure(figsize=(8, 3.5))
plt.subplot(1, 2, 1)
plt.bar(["A", "B", "C"], [3, 7, 5])
plt.title("Batang")
plt.subplot(1, 2, 2)
plt.plot([1, 2, 3], [3, 7, 5])
plt.title("Garis")
plt.show()
