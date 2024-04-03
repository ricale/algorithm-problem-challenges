function solution(n, rows) {
  let result = "";

  for (const [a, b] of rows) {
    let num = 1;
    for (let i = 0; i < b; i++) {
      num = (num * a) % 10;
    }
    result += `${num === 0 ? 10 : num}\n`;
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
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
