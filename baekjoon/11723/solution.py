import sys
# sys.stdin = open("input.txt", "r") 

n = int(sys.stdin.readline())

checked = [0] * 21
lines = []
for _ in range(n):
  input = sys.stdin.readline().rstrip().split(' ')

  if len(input) == 2:
    x = int(input[1])
    if input[0] == 'add':
      checked[x] = 1
    elif input[0] == 'remove':
      checked[x] = 0
    elif input[0] == 'check':
      print(checked[x])
    elif input[0] == 'toggle':
      checked[x] = 0 if checked[x] == 1 else 1
  else:
    if input[0] == 'all':
      checked = [1] * 21
    elif input[0] == 'empty':
      checked = [0] * 21