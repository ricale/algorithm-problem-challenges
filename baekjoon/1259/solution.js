function solution(rows) {
  let result = "";
  for (let row of rows) {
    if (row === "0") {
      break;
    }

    let matched = true;
    for (let i = 0; i < row.length / 2; i++) {
      if (row[i] !== row[row.length - 1 - i]) {
        matched = false;
        break;
      }
    }
    result += matched ? "yes\n" : "no\n";
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
solution(cases);
