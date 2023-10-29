import sys
import math

def ascComparator(a, b):
  if a == None:
    a = math.inf
  if b == None:
    b = math.inf
  return a > b

def descComparator(a, b):
  if a == None:
    a = -math.inf
  if b == None:
    b = -math.inf
  return a < b

class PriorityQueue:
  def __init__(self, isAsc):
    self.queue = []
    self.comparator = ascComparator if isAsc else descComparator

  def pop(self):
    if len(self.queue) == 0:
      return None
    
    if len(self.queue) == 1:
      return self.queue.pop()

    result = self.queue[0]

    self.queue[0] = self.queue.pop()

    idx = 0
    while idx < len(self.queue):
      rIdx = (idx + 1) * 2
      lIdx = rIdx - 1
      curr = self.queue[idx]
      try:
        lval = self.queue[lIdx]
      except:
        lval = None
      try:
        rval = self.queue[rIdx]
      except:
        rval = None

      if self.comparator(curr, lval) and (
        self.comparator(rval, lval) or rval == lval
        ):
        self.queue[idx], self.queue[lIdx] = self.queue[lIdx], self.queue[idx]
        idx = lIdx
      elif self.comparator(curr, rval):
        self.queue[idx], self.queue[rIdx] = self.queue[rIdx], self.queue[idx]
        idx = rIdx
      else:
        break

    return result
  
  def push(self, value):
    idx = len(self.queue)
    self.queue.append(value)

    while idx > 0:
      pIdx = math.ceil(idx / 2) - 1
      if self.comparator(self.queue[pIdx], self.queue[idx]):
        self.queue[pIdx], self.queue[idx] = self.queue[idx], self.queue[pIdx]
        idx = pIdx
      else:
        break;

  def isEmpty(self):
    return len(self.queue) == 0
  
class DoublePriorityQueue:
  def __init__(self):
    self.ascQueue = PriorityQueue(True)
    self.descQueue = PriorityQueue(False)
    self.checked = {}

  def push(self, value):
    self.ascQueue.push(value)
    self.descQueue.push(value)
    try:
      self.checked[value] = self.checked[value] + 1
    except:
      self.checked[value] = 1

  def pop(self, isAsc):
    queue = self.ascQueue if isAsc else self.descQueue

    while not queue.isEmpty():
      popped = queue.pop()
      try:
        checkedCount = self.checked[popped]
      except:
        checkedCount = 0

      if checkedCount > 0:
        if checkedCount == 1:
          del self.checked[popped]
        else:
          self.checked[popped] = self.checked[popped] - 1
        return popped

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
    
    if comm == 'I':
      queue.push(value)
    elif comm == 'D':
      queue.pop(value == -1)

  min = queue.pop(True)
  max = queue.pop(False)
  if max == None:
    max = min 

  if min != None:
    print("{max} {min}".format(max = max, min = min))
  else:
    print('EMPTY')
