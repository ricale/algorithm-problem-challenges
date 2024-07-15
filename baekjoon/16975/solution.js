function initTree(tree, nums, start, end, node) {
  if (start === end) {
    tree[node] = nums[start];
  } else {
    const mid = Math.floor((start + end) / 2);
    tree[node] =
      initTree(tree, nums, start, mid, node * 2) +
      initTree(tree, nums, mid + 1, end, node * 2 + 1);
  }
  return tree[node];
}

function addOrSet(lazy, idx, diff) {
  lazy[idx] = !lazy[idx] ? diff : lazy[idx] + diff;
}

function propagate(tree, lazy, left, right, node) {
  if (lazy[node]) {
    tree[node] += lazy[node] * (right - left + 1);
    addOrSet(lazy, node * 2, lazy[node]);
    addOrSet(lazy, node * 2 + 1, lazy[node]);
    lazy[node] = 0;
  }
}

function updateValue(tree, lazy, diff, tStart, tEnd, rLeft, rRight, node) {
  if (tEnd < rLeft || rRight < tStart) {
    return;
  }

  propagate(tree, lazy, Math.max(tStart, rLeft), Math.min(tEnd, rRight), node);

  tree[node] += diff;

  if (tStart <= rLeft && rRight <= tEnd) {
    addOrSet(lazy, node * 2, diff);
    addOrSet(lazy, node * 2 + 1, diff);
    return;
  }

  const mid = Math.floor((rLeft + rRight) / 2);
  updateValue(tree, lazy, diff, tStart, tEnd, rLeft, mid, node * 2);
  updateValue(tree, lazy, diff, tStart, tEnd, mid + 1, rRight, node * 2 + 1);
}

function getSubSum(tree, lazy, tStart, tEnd, rLeft, rRight, node) {
  if (tEnd < rLeft || rRight < tStart) {
    return 0;
  }

  propagate(tree, lazy, Math.max(tStart, rLeft), Math.min(tEnd, rRight), node);

  if (tStart <= rLeft && rRight <= tEnd) {
    return tree[node];
  }

  const mid = Math.floor((rLeft + rRight) / 2);
  return (
    getSubSum(tree, lazy, tStart, tEnd, rLeft, mid, node * 2) +
    getSubSum(tree, lazy, tStart, tEnd, mid + 1, rRight, node * 2 + 1)
  );
}

function solution(n, nums, m, queries) {
  const tree = [];
  const lazy = [];
  initTree(tree, nums, 0, n - 1, 1);

  let result = "";
  for (const [comm, ...query] of queries) {
    if (comm === 1) {
      const [i, j, k] = query;
      updateValue(tree, lazy, k, i - 1, j - 1, 0, n - 1, 1);
    } else {
      const [x] = query;
      const subSum = getSubSum(tree, lazy, x - 1, x - 1, 0, n - 1, 1);
      result = `${result}${subSum}\n`;
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
  const n = +cases[idx++];
  const nums = cases[idx++].split(" ").map((it) => +it);
  const m = +cases[idx++];
  const queries = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, nums, m, queries);
}
