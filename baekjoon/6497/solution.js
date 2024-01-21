function getRoot(roots, n) {
  if (roots[n] !== n) {
    roots[n] = getRoot(roots, roots[n]);
  }
  return roots[n];
}

function solution(n, m, routes) {
  routes.sort((a, b) => a[2] - b[2]);
  const total = routes.reduce((acc, item) => acc + item[2], 0);

  const roots = [...new Array(n)].map((_, it) => it);
  let sum = 0;

  for (const [x, y, z] of routes) {
    const rootX = getRoot(roots, x);
    const rootY = getRoot(roots, y);
    if (rootX !== rootY) {
      sum += z;
      roots[rootY] = rootX;
    }
  }

  console.log(total - sum);
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
  if (n === 0 && m === 0) {
    break;
  }
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, m, rows);
}
