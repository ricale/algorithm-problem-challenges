function solution(n, m, rows) {
  let count = 2;
  const queue = [{ x: 0, y: 0, count }];
  rows[0][0] = count;

  while (rows[n - 1][m - 1] === 1) {
    const { x, y, count: c } = queue.shift();

    const nexts = [
      [y - 1, x],
      [y + 1, x],
      [y, x - 1],
      [y, x + 1],
    ];
    const nextCount = c + 1;

    for (const [y2, x2] of nexts) {
      if (rows[y2]?.[x2] === 1) {
        rows[y2][x2] = nextCount;
        queue.push({ x: x2, y: y2, count: nextCount });
      }
    }
  }

  console.log(rows[n - 1][m - 1] - 1);
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split("")
      .map((it) => +it);
  });
  solution(n, m, rows);

  idx += n + offset;
}
