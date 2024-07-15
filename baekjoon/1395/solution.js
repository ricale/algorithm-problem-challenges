function propagate(tree, lazy, count, node) {
  if (lazy[node]) {
    lazy[node] = 0;
    tree[node] = count - tree[node];
    if (count > 1) {
      lazy[node * 2] = 1 - lazy[node * 2];
      lazy[node * 2 + 1] = 1 - lazy[node * 2 + 1];
    }
  }
}

function update(tree, lazy, tStart, tEnd, rLeft, rRight, node) {
  propagate(tree, lazy, rRight - rLeft + 1, node);

  if (tEnd < rLeft || rRight < tStart) {
    return 0;
  }

  if (tStart <= rLeft && rRight <= tEnd) {
    tree[node] = rRight - rLeft + 1 - tree[node];
    lazy[node * 2] = 1 - lazy[node * 2];
    lazy[node * 2 + 1] = 1 - lazy[node * 2 + 1];
    return;
  }

  if (rLeft === rRight) {
    tree[node] = 1 - tree[node];
    return;
  }
  const mid = Math.floor((rLeft + rRight) / 2);
  update(tree, lazy, tStart, tEnd, rLeft, mid, node * 2);
  update(tree, lazy, tStart, tEnd, mid + 1, rRight, node * 2 + 1);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

function getSubResult(tree, lazy, tStart, tEnd, rLeft, rRight, node) {
  propagate(tree, lazy, rRight - rLeft + 1, node);

  if (tEnd < rLeft || rRight < tStart) {
    return 0;
  }

  if (tStart <= rLeft && rRight <= tEnd) {
    return tree[node];
  }

  const mid = Math.floor((rLeft + rRight) / 2);
  return (
    getSubResult(tree, lazy, tStart, tEnd, rLeft, mid, node * 2) +
    getSubResult(tree, lazy, tStart, tEnd, mid + 1, rRight, node * 2 + 1)
  );
}

function solution(n, m, rows) {
  const tree = new Array(n * 4).fill(0);
  const lazy = new Array(n * 4).fill(0);

  let result = "";
  for (const [o, s, t] of rows) {
    if (o === 0) {
      update(tree, lazy, s - 1, t - 1, 0, n - 1, 1);
    } else {
      result += `${getSubResult(tree, lazy, s - 1, t - 1, 0, n - 1, 1)}\n`;
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
