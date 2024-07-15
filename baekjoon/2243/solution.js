function update(tree, index, diff, start, end, node) {
  tree[node] += diff;

  if (start === end) {
    return;
  }

  const mid = Math.floor((start + end) / 2);
  if (index <= mid) {
    update(tree, index, diff, start, mid, node * 2);
  } else {
    update(tree, index, diff, mid + 1, end, node * 2 + 1);
  }
}

function getSubResult(tree, target, start, end, node) {
  tree[node] -= 1;

  if (start === end) {
    return start;
  }

  const mid = Math.floor((start + end) / 2);
  const result =
    target <= tree[node * 2]
      ? getSubResult(tree, target, start, mid, node * 2)
      : getSubResult(tree, target - tree[node * 2], mid + 1, end, node * 2 + 1);
  return result;
}

const MAX = 1_000_000;

function solution(n, rows) {
  const tree = new Array((MAX + 1) * 4).fill(0);

  let result = "";
  for (const [a, b, c] of rows) {
    if (a === 1) {
      const subResult = getSubResult(tree, b, 0, MAX, 1);
      result += `${subResult}\n`;
    } else {
      update(tree, b, c, 0, MAX, 1);
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
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
