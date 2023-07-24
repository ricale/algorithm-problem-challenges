function solution(rows) {
  let result = "";
  for (const row of rows) {
    if (row[0] === 0) {
      break;
    }
    row.sort((a, b) => a - b);
    result += row[0] ** 2 + row[1] ** 2 === row[2] ** 2 ? "right\n" : "wrong\n";
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

const cases = input
  .split("\n")
  .filter((item) => !!item)
  .map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
solution(cases);
