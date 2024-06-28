function initTree(nums, tree, start, end, node) {
  if (start === end) {
    tree[node] = nums[start];
  } else {
    const mid = Math.floor((start + end) / 2);
    tree[node] =
      initTree(nums, tree, start, mid, node * 2) +
      initTree(nums, tree, mid + 1, end, node * 2 + 1);
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

function updateValue(tree, target, diff, left, right, node) {
  if (target < left || right < target) {
    return;
  }

  tree[node] += diff;

  if (left === right) {
    return;
  }

  const mid = Math.floor((left + right) / 2);
  updateValue(tree, target, diff, left, mid, node * 2);
  updateValue(tree, target, diff, mid + 1, right, node * 2 + 1);
}

function solution(n, m, k, nums, queries) {
  const tree = [];
  initTree(nums, tree, 0, n - 1, 1);

  let result = "";
  for (const [comm, from, to, diff] of queries) {
    if (comm === 1) {
      for (let i = from; i <= to; i++) {
        updateValue(tree, i, BigInt(diff), 1, n, 1);
        nums[i - 1] += BigInt(diff);
      }
    } else if (comm === 2) {
      result = `${result}${getSubSum(tree, from, to, 1, n, 1)}\n`;
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
  const [n, m, k] = cases[idx++].split(" ").map((it) => +it);
  const nums = cases.slice(idx, idx + n).map((item) => {
    return BigInt(item);
  });
  idx += n;
  const queries = cases.slice(idx, idx + m + k).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m + k;

  solution(n, m, k, nums, queries);
}
