function dnq(heights, start, end) {
  if (start === end) {
    return heights[start];
  }

  const mid = Math.floor((start + end) / 2);
  const res1 = dnq(heights, start, mid);
  const res2 = dnq(heights, mid + 1, end);

  let max = Math.max(res1, res2, heights[mid]);
  let left = mid;
  let right = mid;
  let minHeight = heights[mid];
  while (start < left && right < end) {
    if (heights[left - 1] > heights[right + 1]) {
      left -= 1;
      minHeight = Math.min(minHeight, heights[left]);
    } else {
      right += 1;
      minHeight = Math.min(minHeight, heights[right]);
    }
    max = Math.max(max, minHeight * (right - left + 1));
  }
  while (start < left) {
    left -= 1;
    minHeight = Math.min(minHeight, heights[left]);
    max = Math.max(max, minHeight * (right - left + 1));
  }
  while (right < end) {
    right += 1;
    minHeight = Math.min(minHeight, heights[right]);
    max = Math.max(max, minHeight * (right - left + 1));
  }

  return max;
}

function solution(n, heights) {
  console.log(dnq(heights, 0, n - 1));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => +item);
  solution(n, rows);

  idx += n + offset;
}
