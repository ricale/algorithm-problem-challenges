function initTree(node, start, end, nums, tree) {
  if (start === end) {
    tree[node] = nums[start];
    return;
  }
  const mid = Math.floor((start + end) / 2);
  initTree(node * 2, start, mid, nums, tree);
  initTree(node * 2 + 1, mid + 1, end, nums, tree);
  tree[node] = (tree[node * 2] ?? 0) + (tree[node * 2 + 1] ?? 0);
}

function getSubSum(node, start, end, left, right, tree) {
  if (right < start || end < left) {
    return 0n;
  }

  if (start <= left && right <= end) {
    return tree[node];
  }

  const mid = Math.floor((left + right) / 2);
  return (
    getSubSum(node * 2, start, end, left, mid, tree) +
    getSubSum(node * 2 + 1, start, end, mid + 1, right, tree)
  );
}

function updateValue(node, target, diff, left, right, tree) {
  if (target < left || right < target) {
    return;
  }

  tree[node] += diff;

  if (left === right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);
  updateValue(node * 2, target, diff, left, mid, tree);
  updateValue(node * 2 + 1, target, diff, mid + 1, right, tree);
}

function solution(n, q, nums, queries) {
  const tree = [];
  initTree(1, 0, n - 1, nums, tree);

  let result = "";
  for (const [_x, _y, a, b] of queries) {
    const [x, y] = _x <= _y ? [_x, _y] : [_y, _x];

    result = `${result}${getSubSum(1, x - 1n, y - 1n, 0, n - 1, tree)}\n`;
    updateValue(1, a - 1n, b - nums[a - 1n], 0, n - 1, tree);
    nums[a - 1n] = b;
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
  const [n, q] = cases[idx++].split(" ").map((it) => +it);
  const nums = cases[idx++].split(" ").map((it) => BigInt(it));
  const queries = cases.slice(idx, idx + q).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => BigInt(it));
  });
  idx += q;

  solution(n, q, nums, queries);
}
