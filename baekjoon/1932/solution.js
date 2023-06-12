function solution(n, rows) {
  for (let i = rows.length - 2; i >= 0; i--) {
    const row = rows[i];
    for (let j = 0; j < row.length; j++) {
      row[j] += Math.max(rows[i + 1][j], rows[i + 1][j + 1]);
    }
  }
  console.log(rows[0][0]);
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
