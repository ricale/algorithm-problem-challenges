function findRoot(roots, n) {
  if (roots[n] === n) {
    return roots[n];
  }
  roots[n] = findRoot(roots, roots[n]);
  return roots[n];
}

function solution(n, rows) {
  const queue = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      queue.push({
        a: i,
        b: j,
        weight: Math.sqrt(
          Math.pow(rows[j][1] - rows[i][1], 2) +
            Math.pow(rows[j][0] - rows[i][0], 2)
        ),
      });
    }
  }
  queue.sort((a, b) => a.weight - b.weight);

  const roots = [...new Array(n)].map((_, idx) => idx);
  let sum = 0;

  for (let i = 0; i < queue.length; i++) {
    const { a, b, weight } = queue[i];
    const rootA = findRoot(roots, a);
    const rootB = findRoot(roots, b);
    if (rootA !== rootB) {
      sum += weight;
      roots[rootA] = rootB;
    }
  }

  console.log(sum);
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
