function solution(n, rows) {
  let result = "";
  for (let row of rows) {
    let sum = 0;
    let last = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i] === "O") {
        last += 1;
        sum += last;
      } else {
        last = 0;
      }
    }
    result += `${sum}\n`;
  }
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
  const rows = cases.slice(idx + offset, idx + n + offset);
  solution(n, rows);

  idx += n + offset;
}
