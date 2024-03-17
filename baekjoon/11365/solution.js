function solution(rows) {
  let result = "";
  for (const line of rows) {
    if (line === "END") {
      break;
    }
    result += `${line.split("").reverse().join("")}\n`;
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

const rows = input.split("\n").filter((item) => !!item);

solution(rows);
