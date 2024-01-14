function getRoot(node, roots) {
  if (roots[node] === node) {
    return node;
  }
  roots[node] = getRoot(roots[node], roots);
  return roots[node];
}

function solution(n, m, rows, dests) {
  const roots = [...new Array(n + 1)].map((_, i) => i);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (rows[i][j] === 1) {
        const iRoot = getRoot(roots[i + 1], roots);
        const jRoot = getRoot(roots[j + 1], roots);
        if (iRoot !== jRoot) {
          roots[iRoot] = jRoot;
        }
      }
    }
  }

  for (let i = 1; i < m; i++) {
    if (getRoot(dests[i - 1], roots) !== getRoot(dests[i], roots)) {
      console.log("NO");
      return;
    }
  }
  console.log("YES");
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
  const m = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;
  const dests = cases[idx++].split(" ").map((it) => +it);

  solution(n, m, rows, dests);
}
