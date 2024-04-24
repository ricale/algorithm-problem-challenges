import sys

if sys.platform != 'linux' and sys.platform != 'linux2':
  sys.stdin = open("input.txt", "r")

n = int(sys.stdin.readline().rstrip())

values = []
last = list(
  map(
    lambda it: int(it),
    sys.stdin.readline().rstrip().split(' ')
  )
)
maxResult = last.copy()
minResult = last.copy()
for _ in range(n - 1):

  last = list(
    map(
      lambda it: int(it),
      sys.stdin.readline().rstrip().split(' ')
    )
  )

  maxResult = [
    last[0] + max(maxResult[0], maxResult[1]),
    last[1] + max(maxResult),
    last[2] + max(maxResult[1], maxResult[2]),
  ]
  minResult = [
    last[0] + min(minResult[0], minResult[1]),
    last[1] + min(minResult),
    last[2] + min(minResult[1], minResult[2]),
  ]

print(
  ' '.join([
    str(max(maxResult)),
    str(min(minResult))
  ])
)
