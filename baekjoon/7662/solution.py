import sys
import heapq
  
class DoublePriorityQueue:
  def __init__(self):
    self.ascQueue = []
    self.descQueue = []
    self.checked = {}

  def push(self, value):
    # print('push')
    heapq.heappush(self.ascQueue, (value, value))
    heapq.heappush(self.descQueue, (-value, value))
    # print(self.ascQueue)
    # print(self.descQueue)
    try:
      self.checked[value] = self.checked[value] + 1
    except:
      self.checked[value] = 1
    # print(self.checked)

  def pop(self, isAsc):
    # print('pop')
    queue = self.ascQueue if isAsc else self.descQueue

    while len(queue) > 0:
      popped = heapq.heappop(queue)[1]
      # print(popped)
      try:
        checkedCount = self.checked[popped]
      except:
        checkedCount = 0
      # print(checkedCount)

      if checkedCount > 0:
        if checkedCount == 1:
          del self.checked[popped]
        else:
          self.checked[popped] = self.checked[popped] - 1
        # print(self.ascQueue)
        # print(self.descQueue)
        return popped

    # print(self.ascQueue)
    # print(self.descQueue)
    return None

if sys.platform != 'linux' and sys.platform != 'linux2':
  sys.stdin = open("input.txt", "r")

n = int(sys.stdin.readline().rstrip())

for _ in range(n):
  k = int(sys.stdin.readline().rstrip())

  queue = DoublePriorityQueue()

  for _ in range(k):
    [comm, value] = list(map(
      lambda item: item[1] if item[0] == 0 else int(item[1]),
      enumerate(sys.stdin.readline().rstrip().split(' '))
    ))

    # print([comm, value])
    
    if comm == 'I':
      queue.push(value)
    elif comm == 'D':
      queue.pop(value == -1)

  min = queue.pop(True)
  max = queue.pop(False)
  if max == None:
    max = min 

  # print()
  if min != None:
    print("{max} {min}".format(max = max, min = min))
  else:
    print('EMPTY')
