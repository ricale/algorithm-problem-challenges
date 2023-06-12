function solution(n, rows) {
  const sums = [rows[0]];
  for (let i = 1; i < rows.length; i++) {
    const current = rows[i];
    const lastCosts = sums[i - 1];
    sums[i] = [
      current[0] + Math.min(lastCosts[1], lastCosts[2]),
      current[1] + Math.min(lastCosts[0], lastCosts[2]),
      current[2] + Math.min(lastCosts[0], lastCosts[1]),
    ];
  }

  console.log(Math.min(...sums[sums.length - 1]));
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
      .split(" ")
      .map((it) => +it);
  });
  solution(n, rows);

  idx += n + offset;
}
