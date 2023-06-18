function initTree(tree, idx, start, end, nums) {
  if (start === end) {
    tree[idx] = [start, nums[start]];
    return;
  }

  const mid = Math.floor((start + end) / 2);
  initTree(tree, idx * 2, start, mid, nums);
  initTree(tree, idx * 2 + 1, mid + 1, end, nums);
  const left = tree[idx * 2];
  const right = tree[idx * 2 + 1];
  tree[idx] =
    left[1] < right[1]
      ? left
      : left[1] > right[1]
      ? right
      : left[0] < right[0]
      ? left
      : right;
}

function updateTree(tree, idx, start, end, target, value) {
  if (start > target || target > end) {
    return;
  }
  if (start === end) {
    tree[idx] = [target, value];
    return;
  }

  const mid = Math.floor((start + end) / 2);
  updateTree(tree, idx * 2, start, mid, target, value);
  updateTree(tree, idx * 2 + 1, mid + 1, end, target, value);
  const left = tree[idx * 2];
  const right = tree[idx * 2 + 1];
  tree[idx] =
    left[1] < right[1]
      ? left
      : left[1] > right[1]
      ? right
      : left[0] < right[0]
      ? left
      : right;
}

function queryToTree(tree, idx, start, end, left, right) {
  if (start > right || left > end) {
    return;
  }
  if (left <= start && end <= right) {
    return tree[idx];
  }

  const mid = Math.floor((start + end) / 2);
  const lRes = queryToTree(tree, idx * 2, start, mid, left, right);
  const rRes = queryToTree(tree, idx * 2 + 1, mid + 1, end, left, right);
  if (!lRes) return rRes;
  if (!rRes) return lRes;

  return lRes[1] < rRes[1]
    ? lRes
    : lRes[1] > rRes[1]
    ? rRes
    : lRes[0] < rRes[0]
    ? lRes
    : rRes;
}

function solution(n, nums, m, rows) {
  const tree = [];
  initTree(tree, 1, 0, n - 1, nums);

  let result = "";
  for (const [comm, b, c] of rows) {
    if (comm === 1) {
      nums[b - 1] = c;
      updateTree(tree, 1, 0, n - 1, b - 1, c);
    } else if (comm === 2) {
      const queried = queryToTree(tree, 1, 0, n - 1, b - 1, c - 1);
      result += `${queried[0] + 1}\n`;
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
  const n = +cases[idx];
  const nums = cases[idx + 1].split(" ").map((it) => +it);
  const m = +cases[idx + 2];
  const offset = 3;
  const rows = cases.slice(idx + offset, idx + m + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, nums, m, rows);

  idx += m + offset;
}
