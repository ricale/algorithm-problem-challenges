import sys

if sys.platform != 'linux' and sys.platform != 'linux2':
  sys.stdin = open("input.txt", "r")

[_e, _s, _m] = list(
  map(
    lambda it: int(it),
    sys.stdin.readline().rstrip().split()
  )
)

E = 15
S = 28
M = 19

e = 0 if _e == E else _e
s = 0 if _s == S else _s
m = 0 if _m == M else _m

for i in range(1, E * S * M + 1):
  if i % E == e and i % S == s and i % M == m:
    print(i)
    break


# values = list(
#   map(
#     lambda it: int(it),
#     sys.stdin.readline().rstrip().split(' ')
#   )
# )