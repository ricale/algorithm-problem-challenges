function solution(n, m, rows) {
  const result = new Array(+n).fill(0);

  for (let [i, j, k] of rows) {
    for (let l = +i - 1; l <= +j - 1; l++) {
      result[l] = +k;
    }
  }

  console.log(result.join(" "));
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
  const [n, m] = cases[idx].split(" ");
  const offset = 1;
  const rows = cases
    .slice(idx + offset, idx + m + offset)
    .map((it) => it.trim().split(" "));
  solution(n, m, rows);

  idx += m + offset;
}
