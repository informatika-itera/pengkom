import seaborn as sns
import matplotlib.pyplot as plt

nilai = [75, 80, 85, 78, 92, 88, 90]
sns.histplot(nilai, kde=True)
plt.title("Distribusi Nilai")
plt.show()
