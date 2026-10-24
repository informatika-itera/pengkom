import matplotlib.pyplot as plt

plt.figure(figsize=(8, 3))
plt.subplot(1, 2, 1)
plt.bar(["a", "b"], [2, 5])
plt.subplot(1, 2, 2)
plt.pie([1, 3])
plt.show()
