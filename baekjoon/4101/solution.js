function solution(rows) {
  let result = "";
  for (const [a, b] of rows) {
    if (a === 0 && b === 0) break;
    result += a > b ? "Yes\n" : "No\n";
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
