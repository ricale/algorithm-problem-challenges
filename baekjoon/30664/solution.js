function solution(rows) {
  let result = "";
  for (const number of rows) {
    if (number === BigInt(0)) {
      break;
    }
    result += `${
      number % BigInt(42) === BigInt(0) ? "PREMIADO" : "TENTE NOVAMENTE"
    }\n`;
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
    return BigInt(item);
  });
solution(rows);
