function solution(n, m, r, rows) {
  const connections = [...new Array(n + 1)].map(() => []);

  for (const [u, v] of rows) {
    connections[u].push(v);
    connections[v].push(u);
  }

  for (let i = 1; i <= n; i++) {
    connections[i].sort((a, b) => a - b);
  }

  const checked = new Array(n + 1).fill(0);
  let count = 0;
  checked[r] = count;

  const queue = [r];
  while (queue.length > 0) {
    const shifted = queue[0];
    for (let i = 0; i < connections[shifted].length; i++) {
      const connShifted = connections[shifted][i];
      if (checked[connShifted] === 0) {
        checked[connShifted] = ++count;
        queue.push(connShifted);
      }
    }
  }

  console.log(checked.slice(1).join("\n"));
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
  const [n, m, r] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + m + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, m, r, rows);

  idx += m + offset;
}
