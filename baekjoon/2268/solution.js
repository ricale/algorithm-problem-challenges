function initTree(tree, nums, node, start, end) {
  if (start === end) {
    tree[node] = nums[start];
  } else {
    const mid = Math.floor((start + end) / 2);
    tree[node] =
      initTree(tree, nums, node * 2, start, mid) +
      initTree(tree, nums, node * 2 + 1, mid + 1, end);
  }
  return tree[node];
}

function getSubSum(tree, targetStart, targetEnd, rangeLeft, rangeRight, node) {
  if (targetEnd < rangeLeft || rangeRight < targetStart) {
    return 0n;
  }

  if (targetStart <= rangeLeft && rangeRight <= targetEnd) {
    return tree[node];
  }

  const mid = Math.floor((rangeLeft + rangeRight) / 2);
  return (
    getSubSum(tree, targetStart, targetEnd, rangeLeft, mid, node * 2) +
    getSubSum(tree, targetStart, targetEnd, mid + 1, rangeRight, node * 2 + 1)
  );
}

function updateValue(tree, target, diff, rangeLeft, rangeRight, node) {
  if (target < rangeLeft || rangeRight < target) {
    return;
  }

  tree[node] += diff;

  if (rangeLeft === rangeRight) {
    return;
  }

  const mid = Math.floor((rangeLeft + rangeRight) / 2);
  updateValue(tree, target, diff, rangeLeft, mid, node * 2);
  updateValue(tree, target, diff, mid + 1, rangeRight, node * 2 + 1);
}

function solution(n, m, rows) {
  const tree = [];
  const nums = new Array(n).fill(0n);
  initTree(tree, nums, 1, 0, n - 1);

  let result = "";
  for (const [comm, a, b] of rows) {
    if (comm === 0) {
      const [i, j] = a < b ? [a, b] : [b, a];
      result += `${getSubSum(tree, i - 1, j - 1, 0, n - 1, 1)}\n`;
    } else {
      const diff = BigInt(b) - nums[a - 1];
      updateValue(tree, a - 1, diff, 0, n - 1, 1);
      nums[a - 1] = BigInt(b);
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
  const [n, m] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, m, rows);
}
