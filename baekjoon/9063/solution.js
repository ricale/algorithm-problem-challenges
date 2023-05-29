function solution(n, rows) {
  let minX = 10000,
    maxX = -10000;
  let minY = 10000,
    maxY = -10000;

  for (const row of rows) {
    const [x, y] = [+row[0], +row[1]];
    if (minX > x) {
      minX = x;
    }
    if (maxX < x) {
      maxX = x;
    }
    if (minY > y) {
      minY = y;
    }
    if (maxY < y) {
      maxY = y;
    }
  }

  console.log((maxX - minX) * (maxY - minY));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases
    .slice(idx + offset, idx + n + offset)
    .map((it) => it.trim().split(" "));
  solution(n, rows);

  idx += n + offset;
}
