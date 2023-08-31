function dfs(n, v, connections) {
  const checked = new Array(n + 1).fill(false);
  const stack = [v];
  checked[v] = true;
  const result = [v];

  while (stack.length > 0) {
    const top = stack[stack.length - 1];

    while (true) {
      const item = connections[top].shift();
      if (item === undefined) {
        stack.pop();
        break;
      } else if (!checked[item]) {
        checked[item] = true;
        result.push(item);
        stack.push(item);
        break;
      }
    }
  }

  return result;
}

function bfs(n, v, connections) {
  const checked = new Array(n + 1).fill(false);
  const queue = [v];
  checked[v] = true;
  const result = [v];

  while (queue.length > 0) {
    const popped = queue.shift();

    const conn = connections[popped];
    for (let i = 0; i < conn.length; i++) {
      const item = conn[i];
      if (!checked[item]) {
        checked[item] = true;
        result.push(item);
        queue.push(item);
      }
    }
  }

  return result;
}

function solution(n, m, v, rows) {
  const connections = [...new Array(n + 1)].map(() => []);

  for (const [u, v] of rows) {
    connections[u].push(v);
    connections[v].push(u);
  }

  for (let i = 1; i <= n; i++) {
    connections[i].sort((a, b) => a - b);
  }

  const bfsResult = bfs(n, v, connections);
  const dfsResult = dfs(n, v, connections);

  console.log(`${dfsResult.join(" ")}\n${bfsResult.join(" ")}`);
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
  const [n, m, v] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + m + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, m, v, rows);

  idx += m + offset;
}
