function solution(n, m, rows) {
  const result = [...new Array(+n)].map((_, i) => i + 1);

  for (let row of rows) {
    const i = +row[0] - 1;
    const j = +row[1] - 1;

    for (let k = i; k < i + (j - i) / 2; k++) {
      const op = j - (k - i);
      [result[k], result[op]] = [result[op], result[k]];
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
