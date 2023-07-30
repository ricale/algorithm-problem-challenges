function solution(n, rows) {
  if (rows.length === 0) {
    console.log(0);
    return;
  }

  rows.sort((a, b) => a - b);
  const exclude = Math.round(n * 0.15);
  const sliced = exclude === 0 ? rows : rows.slice(exclude, -exclude);
  const result = Math.round(
    sliced.reduce((acc, item) => acc + item, 0) / (n - exclude * 2)
  );
  console.log(result);
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
    return +item;
  });
  solution(n, rows);

  idx += n + offset;
}
