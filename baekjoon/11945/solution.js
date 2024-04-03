function solution(n, m, rows) {
  console.log(rows.map((row) => row.split("").reverse().join("")).join("\n"));
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
  const [n, m] = cases[idx++].split(" ").map((item) => +item);
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item;
  });
  idx += n;

  solution(n, m, rows);
}
