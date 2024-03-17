function solution(rows) {
  let result = "";
  for (let i = 0; i < rows.length; i++) {
    const [l, p, v] = rows[i];
    if (l === 0) {
      break;
    }
    result += `Case ${i + 1}: ${Math.floor(v / p) * l + Math.min(v % p, l)}\n`;
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
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
solution(rows);
