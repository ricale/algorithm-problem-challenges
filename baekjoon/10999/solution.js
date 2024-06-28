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

function getSubSum(
  tree,
  lazy,
  targetStart,
  targetEnd,
  rangeLeft,
  rangeRight,
  node
) {
  if (lazy[node]) {
    tree[node] += lazy[node] * BigInt(rangeRight - rangeLeft + 1);
    if (tree[node * 2] !== undefined) {
      lazy[node * 2] = (lazy[node * 2] || 0n) + lazy[node];
    }
    if (tree[node * 2 + 1] !== undefined) {
      lazy[node * 2 + 1] = (lazy[node * 2 + 1] || 0n) + lazy[node];
    }
    lazy[node] = 0;
  }

  if (targetEnd < rangeLeft || rangeRight < targetStart) {
    return 0n;
  }

  if (targetStart <= rangeLeft && rangeRight <= targetEnd) {
    return tree[node];
  }

  const mid = Math.floor((rangeLeft + rangeRight) / 2);

  return (
    getSubSum(tree, lazy, targetStart, targetEnd, rangeLeft, mid, node * 2) +
    getSubSum(
      tree,
      lazy,
      targetStart,
      targetEnd,
      mid + 1,
      rangeRight,
      node * 2 + 1
    )
  );
}

function updateValue(
  tree,
  lazy,
  targetStart,
  targetEnd,
  diff,
  rangeLeft,
  rangeRight,
  node
) {
  if (lazy[node]) {
    tree[node] += lazy[node] * BigInt(rangeRight - rangeLeft + 1);
    if (tree[node * 2] !== undefined) {
      lazy[node * 2] = (lazy[node * 2] || 0n) + lazy[node];
    }
    if (tree[node * 2 + 1] !== undefined) {
      lazy[node * 2 + 1] = (lazy[node * 2 + 1] || 0n) + lazy[node];
    }
    lazy[node] = 0;
  }

  if (targetEnd < rangeLeft || rangeRight < targetStart) {
    return;
  }

  if (targetStart <= rangeLeft && rangeRight <= targetEnd) {
    tree[node] += diff * BigInt(rangeRight - rangeLeft + 1);
    if (tree[node * 2] !== undefined) {
      lazy[node * 2] = (lazy[node * 2] || 0n) + diff;
    }
    if (tree[node * 2 + 1] !== undefined) {
      lazy[node * 2 + 1] = (lazy[node * 2 + 1] || 0n) + diff;
    }
    return;
  }

  const left = Math.max(targetStart, rangeLeft);
  const right = Math.min(targetEnd, rangeRight);
  tree[node] += diff * BigInt(right - left + 1);

  const mid = Math.floor((rangeLeft + rangeRight) / 2);
  updateValue(
    tree,
    lazy,
    targetStart,
    targetEnd,
    diff,
    rangeLeft,
    mid,
    node * 2
  );
  updateValue(
    tree,
    lazy,
    targetStart,
    targetEnd,
    diff,
    mid + 1,
    rangeRight,
    node * 2 + 1
  );
}

function solution(n, m, k, nums, queries) {
  const tree = [];
  const lazy = [];
  initTree(nums, tree, 0, n - 1, 1);

  let result = "";
  for (const [comm, from, to, diff] of queries) {
    if (comm === 1) {
      updateValue(tree, lazy, from, to, BigInt(diff), 1, n, 1);
    } else if (comm === 2) {
      result = `${result}${getSubSum(tree, lazy, from, to, 1, n, 1)}\n`;
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
