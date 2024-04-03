function solution(rows) {
  let result = "";
  for (const [name, age, weight] of rows) {
    if (name === "#") {
      break;
    }
    result += `${name} ${age > 17 || weight >= 80 ? "Senior" : "Junior"}\n`;
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
    return item.trim().split(" ");
  });
solution(rows);
