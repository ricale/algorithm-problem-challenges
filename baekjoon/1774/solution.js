function getRoot(roots, n) {
  if (roots[n] !== n) {
    roots[n] = getRoot(roots, roots[n]);
  }
  return roots[n];
}

function solution(n, m, coords, connections) {
  const queue = [];
  for (const [a, b] of connections) {
    queue.push({
      a,
      b,
      weight: 0,
    });
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      queue.push({
        a: i + 1,
        b: j + 1,
        weight: Math.sqrt(
          Math.pow(coords[i][0] - coords[j][0], 2) +
            Math.pow(coords[i][1] - coords[j][1], 2)
        ),
      });
    }
  }
  queue.sort((a, b) => a.weight - b.weight);

  let sum = 0;

  const roots = [...new Array(n + 1)].map((_, idx) => idx);
  for (const { a, b, weight } of queue) {
    const rootA = getRoot(roots, a);
    const rootB = getRoot(roots, b);
    if (rootA !== rootB) {
      sum += weight;
      roots[rootB] = rootA;
    }
  }

  console.log((Math.round(sum * 100) / 100).toFixed(2));
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
  const coords = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;
  const connections = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, m, coords, connections);
}
