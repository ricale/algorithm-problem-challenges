function isPossible(v, edges) {
  const connections = [...new Array(v + 1)].map(() => []);
  const checked = new Array(v + 1).fill(0);

  for (let [v1, u1] of edges) {
    connections[v1].push(u1);
    connections[u1].push(v1);
  }

  const queue = [];
  let qidx = 0;
  for (let i = 1; i <= v; i++) {
    if (checked[i] === 0) {
      checked[i] = 1;
      queue.push(i);
    }

    while (queue.length > qidx) {
      const item = queue[qidx++];
      const value = checked[item];
      const nextValue = value === 1 ? 2 : 1;

      for (let next of connections[item]) {
        if (checked[next] === 0) {
          checked[next] = nextValue;
          queue.push(next);
        } else if (checked[next] === value) {
          return false;
        }
      }
    }
  }

  return true;
}

function solution(n, rows) {
  let result = "";

  for (let i = 0; i < n; i++) {
    const { v, e, edges } = rows[i];
    const subResult = isPossible(v, edges) ? "YES" : "NO";
    result += subResult + "\n";
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
// while (idx < cases.length) {
const n = +cases[idx++];
const rows = [];

for (let i = 0; i < n; i++) {
  const [v, e] = cases[idx++].split(" ").map((it) => +it);
  const edges = [];
  for (let j = 0; j < e; j++) {
    const edge = cases[idx++].split(" ").map((it) => +it);
    edges.push(edge);
  }
  rows.push({ v, e, edges });
}

solution(n, rows);
// }
