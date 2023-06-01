function sort(nums, first, last) {
  if (first >= last) {
    return;
  }

  let p = first;
  let left = first + 1;
  let right = last;

  while (left < right) {
    while (nums[left] < nums[p]) {
      left += 1;
    }

    while (nums[right] >= nums[p]) {
      right -= 1;
    }

    if (left >= right) {
      break;
    }

    [nums[left], nums[right]] = [nums[right], nums[left]];
  }

  const mid = nums[left] >= nums[p] ? left - 1 : left;
  [nums[mid], nums[p]] = [nums[p], nums[mid]];

  sort(nums, first, mid - 1);
  sort(nums, mid + 1, last);
}

function solution(n, nums) {
  sort(nums, 0, nums.length - 1);
  console.log(nums.join("\n"));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    const splitted = it.trim().split(" ");
    return splitted.length === 1 ? +splitted[0] : splitted;
  });
  solution(n, rows);

  idx += n + offset;
}
