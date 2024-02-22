function solution(n, m, rows) {
  const nodes = [...new Array(n + 1)].map(() => ({ to: [], from: 0 }));

  for (const [a, b] of rows) {
    nodes[a].to.push(b);
    nodes[b].from += 1;
  }

  const queue = [];

  for (let i = 1; i <= n; i++) {
    if (nodes[i].from === 0) {
      queue.push(i);
    }
  }

  let qidx = 0;
  const result = [];

  while (queue.length > qidx) {
    const node = queue[qidx++];
    result.push(node);
    for (const next of nodes[node].to) {
      nodes[next].from -= 1;
      if (nodes[next].from === 0) {
        queue.push(next);
      }
    }
  }

  console.log(result.join(" "));
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
