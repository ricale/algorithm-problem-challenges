function bfs(rows, i, j, v) {
  const queue = [[i, j]];
  rows[i][j] = v;
  let count = 1;

  while (queue.length > 0) {
    const [y, x] = queue.shift();

    const nexts = [
      [y + 1, x],
      [y - 1, x],
      [y, x + 1],
      [y, x - 1],
    ];

    for (const [y2, x2] of nexts) {
      if (rows[y2]?.[x2] === 1) {
        queue.push([y2, x2]);
        rows[y2][x2] = v;
        count += 1;
      }
    }
  }

  return count;
}

function solution(n, rows) {
  let count = 0;
  const result = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (rows[i][j] === 1) {
        result.push(bfs(rows, i, j, ++count + 1));
      }
    }
  }

  console.log(`${count}\n${result.sort((a, b) => a - b).join("\n")}`);
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
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split("")
      .map((it) => +it);
  });
  solution(n, rows);

  idx += n + offset;
}
