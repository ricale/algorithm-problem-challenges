import sys
sys.stdin = open("input.txt", "r") 

n = int(input())
arr = [input() for _ in range(n)]

def sort(nums, first, last):
  if first >= last:
    return
  
  p = first
  left = first + 1
  right = last

  while left < right:
    while nums[left] < nums[p]:
      left += 1

    while right >= 0 and nums[right] >= nums[p]:
      right -= 1

    if left >= right:
      break

    nums[left], nums[right] = nums[right], nums[left]

  mid = left - 1 if nums[left] >= nums[p] else left
  nums[mid], nums[p] = nums[p], nums[mid]

  sort(nums, first, mid - 1)
  sort(nums, mid + 1, last)

sort(arr, 0, len(arr) - 1)
print('\n'.join(str(it) for it in arr))
