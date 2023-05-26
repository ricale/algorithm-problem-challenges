function solution(rows) {
  let result = "";
  for (let [a, b] of rows) {
    if (a === "0" && b === "0") {
      break;
    }
    result += +a % +b === 0 ? "multiple" : +b % +a === 0 ? "factor" : "neither";
    result += "\n";
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

const cases = input.split("\n").filter((it) => !!it);

const rows = cases.map((it) => it.trim().split(" "));
solution(rows);
