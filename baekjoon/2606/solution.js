function solution(n, m, rows) {
  let count = 0;
  const connections = new Array(n + 1).fill(null);
  const checked = new Array(n + 1).fill(0);
  checked[1] = 1;

  for (const [c1, c2] of rows) {
    if (!connections[c1]) {
      connections[c1] = [];
    }
    connections[c1].push(c2);
    if (!connections[c2]) {
      connections[c2] = [];
    }
    connections[c2].push(c1);
  }

  if (connections[1] === null) {
    console.log(0);
    return;
  }

  const stack = [...connections[1]];

  while (stack.length > 0) {
    const item = stack.pop();
    if (checked[item] === 1) {
      continue;
    }

    checked[item] = 1;
    count += 1;
    if (connections[item]) {
      stack.push(...connections[item]);
    }
  }

  console.log(count);
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
  const n = +cases[idx];
  const m = +cases[idx + 1];
  const offset = 2;
  const rows = cases.slice(idx + offset, idx + m + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, m, rows);

  idx += m + offset;
}
