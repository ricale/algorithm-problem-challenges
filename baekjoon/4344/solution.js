function solution(C, rows) {
  for (let [N, ...scores] of rows) {
    const avg = scores.reduce((acc, it) => acc + +it, 0) / +N;
    const overAvg = scores.filter((it) => it > avg).length;

    console.log(`${((overAvg / +N) * 100).toFixed(3)}%`);
  }
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
