import matplotlib.pyplot as plt

grade = ["A", "B", "C", "D"]
jumlah = [8, 25, 10, 2]
plt.pie(jumlah, labels=grade,
        autopct="%1.1f%%")
plt.title("Distribusi Nilai")
plt.show()
