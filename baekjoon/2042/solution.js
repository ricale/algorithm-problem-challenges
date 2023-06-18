function initTree(start, end, idx, nums, tree) {
  if (start === end) {
    tree[idx] = nums[start];
    return;
  }
  const mid = Math.floor((start + end) / 2);
  initTree(start, mid, idx * 2, nums, tree);
  initTree(mid + 1, end, idx * 2 + 1, nums, tree);
  tree[idx] = (tree[idx * 2] ?? 0) + (tree[idx * 2 + 1] ?? 0);
}

function updateValue(start, end, idx, target, diff, tree) {
  if (start > target || target > end) {
    return;
  }
  tree[idx] += diff;
  if (start === end) {
    return;
  }
  const mid = Math.floor((start + end) / 2);
  updateValue(start, mid, idx * 2, target, diff, tree);
  updateValue(mid + 1, end, idx * 2 + 1, target, diff, tree);
}

function getSubSum(start, end, idx, left, right, tree) {
  if (end < left || right < start) {
    return BigInt(0);
  }
  if (left <= start && end <= right) {
    return tree[idx];
  }
  const mid = Math.floor((start + end) / 2);
  const leftSum = getSubSum(start, mid, idx * 2, left, right, tree);
  const rightSum = getSubSum(mid + 1, end, idx * 2 + 1, left, right, tree);
  return leftSum + rightSum;
}

function solution(n, m, k, nums, rows) {
  const tree = [];
  initTree(0, n - 1, 1, nums, tree);

  let result = "";
  for (const [comm, b, c] of rows) {
    if (comm === 1) {
      const diff = BigInt(c) - nums[b - 1];
      nums[b - 1] = BigInt(c);
      updateValue(0, n - 1, 1, b - 1, diff, tree);
    } else if (comm === 2) {
      const subSum = getSubSum(0, n - 1, 1, b - 1, c - 1, tree);
      result += `${subSum}\n`;
    }
  }
  console.log(result);
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
  const [n, m, k] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const nums = cases
    .slice(idx + offset, idx + n + offset)
    .map((it) => BigInt(it));
  const rows = cases
    .slice(idx + n + offset, idx + n + m + k + offset)
    .map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
  solution(n, m, k, nums, rows);

  idx += n + m + k + offset;
}
