import sys
sys.stdin = open("input.txt", "r") 

line = str(sys.stdin.readline())

[n, k] = map(lambda item: int(item), line.split(' '))

coins = []
for _ in range(n):
  coins.append(int(sys.stdin.readline()))

prev = list(map(
  lambda index_item: 1 if index_item[0] == 0 else 0,
  enumerate([0] * (k + 1))
))
current = []

for i in range(1, n + 1):
  current = list(map(
    lambda index_item: 1 if index_item[0] == 0 else 0,
    enumerate([0] * (k + 1))
  ))
  for j in range(1, k + 1):
    coin = coins[i - 1]
    current[j] = prev[j] + (current[j - coin] if j - coin >= 0 else 0)
  prev = current

print(current[k])
