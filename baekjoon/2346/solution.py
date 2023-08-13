import sys

if sys.platform != 'linux' and sys.platform != 'linux2':
  sys.stdin = open("input.txt", "r")

n = int(sys.stdin.readline().rstrip())

balloons = list(
  map(
    lambda it: int(it),
    sys.stdin.readline().rstrip().split(' ')
  )
)

result = []
length = len(balloons)
i = 0
while True:
  step = balloons[i]
  balloons[i] = None
  result.append(str(i + 1))
  if length == len(result):
    break

  while step != 0:
    i += -1 if step < 0 else 1
    if i < 0:
      i += length
    elif i >= length:
      i %= length
    if balloons[i] is not None:
      step += 1 if step < 0 else -1
    

print(' '.join(result))