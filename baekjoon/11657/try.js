function solution(n, m, rows) {
  const connections = new Map();
  for (const [a, b, c] of rows) {
    const dests = connections.get(a) || new Map();
    dests.set(b, Math.min(dests.get(b) ?? Infinity, c));
    connections.set(a, dests);
  }

  const startIndex = 1;
  const checked = new Array(n + 1).fill(Infinity);
  checked[startIndex] = 0;

  const queue = [startIndex];
  let qidx = 0;

  for (let i = 0; i < n - 1; i++) {
    const popped = queue[qidx++];
    const cands = connections.get(popped);
    if (cands === undefined) {
      continue;
    }
    for (const [to, weight] of cands.entries()) {
      if (checked[to] > checked[popped] + weight) {
        checked[to] = checked[popped] + weight;
        queue.push(to);
      }
    }
  }

  const popped = queue[qidx++];
  if (popped === undefined) {
    console.log(
      checked
        .slice(2)
        .map((item) => (item === Infinity ? -1 : item))
        .join("\n")
    );
    return;
  }

  const cands = connections.get(popped);
  if (cands) {
    for (const [to, weight] of cands.entries()) {
      if (checked[to] > checked[popped] + weight) {
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
