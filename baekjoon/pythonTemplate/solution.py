import sys

if sys.platform != 'linux' and sys.platform != 'linux2':
  sys.stdin = open("input.txt", "r")

# n = int(sys.stdin.readline().rstrip())

# values = list(
#   map(
#     lambda it: int(it),
#     sys.stdin.readline().rstrip().split(' ')
#   )
# )
  
# coins = []
# for _ in range(n):
#   coins.append(int(sys.stdin.readline()))
