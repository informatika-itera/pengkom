import random

random.seed(1)
enam = 0
for i in range(100):
    if random.randint(1, 6) == 6:
        enam += 1
print(enam)
