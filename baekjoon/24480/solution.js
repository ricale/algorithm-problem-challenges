function solution(n, m, r, rows) {
  const connections = [...new Array(n + 1)].map(() => []);

  for (let [u, v] of rows) {
    connections[u].push(v);
    connections[v].push(u);
  }

  for (let i = 1; i <= n; i++) {
    connections[i].sort((a, b) => a - b);
  }

  const stack = [r];
  const checked = new Array(n + 1).fill(0);
  let count = 1;
  checked[r] = count;

  while (stack.length > 0) {
    const top = stack[stack.length - 1];

    while (connections[top].length > 0) {
      const connTop = connections[top][connections[top].length - 1];
      if (checked[connTop] !== 0) {
        connections[top].pop();
      } else {
        break;
      }
    }

    const popped = connections[top].pop();
    if (popped === undefined) {
      stack.pop();
    } else {
      checked[popped] = ++count;
      stack.push(popped);
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
