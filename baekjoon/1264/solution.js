function solution(rows) {
  let result = "";
  for (const line of rows) {
    if (line === "#") {
      break;
    }
    let count = 0;
    for (let i = 0; i < line.length; i++) {
      if (["a", "e", "i", "o", "u"].includes(line[i].toLowerCase())) {
        count += 1;
      }
    }
    result += `${count}\n`;
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
    return item.trim();
  });
solution(rows);
