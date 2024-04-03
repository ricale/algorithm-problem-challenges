function solution(n, rows) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += `${i + 1}. ${rows[i]}\n`;
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item;
  });
  idx += n;

  solution(n, rows);
}
