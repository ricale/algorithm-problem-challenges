function solution(rows) {
  // code
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
