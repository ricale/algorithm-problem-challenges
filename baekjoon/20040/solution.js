function getRoot(p, roots) {
  if (roots[p] === p) {
    return p;
  }
  roots[p] = getRoot(roots[p], roots);
  return roots[p];
}

function solution(n, m, conns) {
  const roots = [...new Array(n)].map((_, i) => i);

  for (let i = 0; i < m; i++) {
    const [p1, p2] = conns[i];
    const r1 = getRoot(p1, roots);
    const r2 = getRoot(p2, roots);
    if (r1 === r2) {
      console.log(i + 1);
      return;
    }
    roots[r1] = roots[r2];
  }

  console.log(0);
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
