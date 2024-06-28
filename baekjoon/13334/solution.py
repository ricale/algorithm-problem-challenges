import sys
from queue import PriorityQueue

if sys.platform != 'linux' and sys.platform != 'linux2':
  sys.stdin = open("input.txt", "r")

n = int(sys.stdin.readline().rstrip())
  
rows = []
for _ in range(n):
  rows.append(
    sorted(
      list(
        map(
          lambda it: int(it),
          sys.stdin.readline().rstrip().split(' ')
        )
      )
    )
  )
rows.sort(key=lambda item: item[1])
  
d = int(sys.stdin.readline().rstrip())

queue = PriorityQueue()

max = 0
for item in rows:
  last = item
  queue.put(item[0])

  while queue.qsize() > 0 and queue.queue[0] < last[1] - d:
    queue.get()

  if max < queue.qsize():
    max = queue.qsize()

print(max)
