function solution(rows) {
  let result = "";
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] === "0") {
      break;
    }
    result += `Case ${i + 1}: Sorting... done!\n`;
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

const rows = input
  .split("\n")
  .filter((item) => !!item)
  .map((item) => {
    return item;
  });
solution(rows);
