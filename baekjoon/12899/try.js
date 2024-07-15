function update(tree, index, start, end, node) {
  tree[node] += 1;

  if (start === end) {
    return;
  }

  const mid = Math.floor((start + end) / 2);
  if (index <= mid) {
    update(tree, index, start, mid, node * 2);
  } else {
    update(tree, index, mid + 1, end, node * 2 + 1);
  }
}

function getSubResult(tree, target, start, end, node) {
  tree[node] -= 1;

  if (start === end) {
    return start;
  }

  const mid = Math.floor((start + end) / 2);
  if (target <= tree[node * 2]) {
    return getSubResult(tree, target, start, mid, node * 2);
  } else {
    const newTarget = target - tree[node * 2];
    return getSubResult(tree, newTarget, mid + 1, end, node * 2 + 1);
  }
}

function solution(n, rows) {
  const tree = new Array(2000001 * 2).fill(0);

  let result = "";
  for (const [t, x] of rows) {
    if (t === 1) {
      update(tree, x, 0, 2000000, 1);
    } else {
      const subResult = getSubResult(tree, x, 0, 2000000, 1);
      result += `${subResult}\n`;
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
