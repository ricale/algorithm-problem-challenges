function solution(n, m, r, rows) {
  const connections = [...new Array(n + 1)].map(() => []);

  for (const [u, v] of rows) {
    connections[u].push(v);
    connections[v].push(u);
  }

  for (let i = 1; i <= n; i++) {
    connections[i].sort((a, b) => b - a);
  }

  const queue = [r];
  let count = 1;
  const checked = new Array(n + 1).fill(0);
  checked[r] = count;

  while (queue.length > 0) {
    const popped = queue.shift();

    const conn = connections[popped];
    for (let i = 0; i < conn.length; i++) {
      const item = conn[i];
      if (checked[item] === 0) {
        checked[item] = ++count;
        queue.push(item);
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
