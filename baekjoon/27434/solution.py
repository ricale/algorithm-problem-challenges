import sys

if sys.platform != 'linux' and sys.platform != 'linux2':
  sys.stdin = open("input.txt", "r")

n = int(sys.stdin.readline().rstrip())

result = 1
for i in range(2, n+1):
  result *= i

print(result)
