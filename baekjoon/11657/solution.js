function solution(n, m, rows) {
  const connections = new Map();
  for (const [a, b, c] of rows) {
    const dests = connections.get(a) || new Map();
    dests.set(b, Math.min(dests.get(b) ?? Infinity, c));
    connections.set(a, dests);
  }

  const checked = new Array(n + 1).fill(Infinity);
  checked[1] = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 1; j <= n; j++) {
      if (checked[j] === Infinity) {
        continue;
      }
      const conn = connections.get(j);
      if (conn === undefined) {
        continue;
      }
      for (const [target, weight] of conn.entries()) {
        if (checked[target] > checked[j] + weight) {
          checked[target] = checked[j] + weight;
        }
      }
    }
  }

  for (let j = 1; j <= n; j++) {
    if (checked[j] === Infinity) {
      continue;
    }
    const conn = connections.get(j);
    if (conn === undefined) {
      continue;
    }
    for (const [target, weight] of conn.entries()) {
      if (checked[target] > checked[j] + weight) {
        console.log("-1");
        return;
      }
    }
  }

  console.log(
    checked
      .slice(2)
      .map((item) => (item === Infinity ? -1 : item))
      .join("\n")
  );
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
