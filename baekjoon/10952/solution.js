function solution(rows) {
  let result = "";
  for (let [n1, n2] of rows) {
    result += `${+n1 + +n2}\n`;
  }
  console.log(result);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const lastIndex = cases.indexOf("0 0", idx);
  const rows = cases.slice(idx, lastIndex).map((it) => it.trim().split(" "));
  solution(rows);

  idx = lastIndex + 1;
}
