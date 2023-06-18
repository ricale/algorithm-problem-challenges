function initTree(tree, idx, start, end, nums) {
  if (start === end) {
    tree[idx] = nums[start];
    return;
  }

  const mid = Math.floor((start + end) / 2);
  initTree(tree, idx * 2, start, mid, nums);
  initTree(tree, idx * 2 + 1, mid + 1, end, nums);
  tree[idx] = Math.min(tree[idx * 2], tree[idx * 2 + 1]);
}

function queryToTree(tree, idx, start, end, left, right) {
  if (start > right || left > end) {
    return Infinity;
  }
  if (left <= start && end <= right) {
    return tree[idx];
  }

  const mid = Math.floor((start + end) / 2);
  const lRes = queryToTree(tree, idx * 2, start, mid, left, right);
  const rRes = queryToTree(tree, idx * 2 + 1, mid + 1, end, left, right);
  return Math.min(lRes, rRes);
}

function solution(n, m, nums, rows) {
  const tree = [];
  initTree(tree, 1, 0, n - 1, nums);

  let result = "";
  for (const [a, b] of rows) {
    const queried = queryToTree(tree, 1, 0, n - 1, a - 1, b - 1);
    result += `${queried}\n`;
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const nums = cases.slice(idx + offset, idx + n + offset).map((item) => +item);
  const rows = cases
    .slice(idx + n + offset, idx + n + m + offset)
    .map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
  solution(n, m, nums, rows);

  idx += n + m + offset;
}
