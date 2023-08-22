function solution(n, m, rows) {
  const connections = [...new Array(n + 1)].map(() => []);

  for (const [n1, n2] of rows) {
    connections[n1].push(n2);
    connections[n2].push(n1);
  }

  let count = 0;
  const checked = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    if (checked[i] !== 0) {
      continue;
    }

    checked[i] = ++count;

    const stack = [...connections[i]];
    while (stack.length > 0) {
      const item = stack.pop();
      if (checked[item] === 0) {
        checked[item] = count;
        stack.push(...connections[item]);
      }
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
  const [m, n] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(m, n, rows);

  idx += n + offset;
}
