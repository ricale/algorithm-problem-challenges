import sys
# sys.stdin = open("input.txt", "r") 

n = int(sys.stdin.readline())
arr = [0] * 10001

for _ in range(n):
  arr[int(sys.stdin.readline())] += 1

for idx in range(10001):
  if arr[idx] != 0:
    for _ in range(arr[idx]):
      print(idx)
