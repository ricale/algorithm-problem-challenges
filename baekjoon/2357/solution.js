function initTree(tree, idx, start, end, nums) {
  if (start === end) {
    tree[idx] = [nums[start], nums[end]];
    return;
  }

  const mid = Math.floor((start + end) / 2);
  initTree(tree, idx * 2, start, mid, nums);
  initTree(tree, idx * 2 + 1, mid + 1, end, nums);
  tree[idx] = [
    Math.min(tree[idx * 2][0], tree[idx * 2 + 1][0]),
    Math.max(tree[idx * 2][1], tree[idx * 2 + 1][1]),
  ];
}

function queryToTree(tree, idx, start, end, left, right) {
  if (start > right || left > end) {
    return [];
  }
  if (left <= start && end <= right) {
    return tree[idx];
  }

  const mid = Math.floor((start + end) / 2);
  const [lMin, lMax] = queryToTree(tree, idx * 2, start, mid, left, right);
  const [rMin, rMax] = queryToTree(
    tree,
    idx * 2 + 1,
    mid + 1,
    end,
    left,
    right
  );
  return [
    Math.min(lMin ?? Infinity, rMin ?? Infinity),
    Math.max(lMax ?? -Infinity, rMax ?? -Infinity),
  ];
}

function solution(n, m, nums, rows) {
  const tree = [];
  initTree(tree, 1, 0, n - 1, nums);

  let result = "";
  for (const [a, b] of rows) {
    const queried = queryToTree(tree, 1, 0, n - 1, a - 1, b - 1);
    result += `${queried.join(" ")}\n`;
  }

  console.log(result);
}

//                    5
//          30                5
//     30       38        20       5
//  30   100  38  50   51   20  81  5
// 75 30              51 52

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
