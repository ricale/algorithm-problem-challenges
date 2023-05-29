function solution(rows) {
  let result = "";
  for (const row of rows) {
    const [a, b, c] = [+row[0], +row[1], +row[2]];
    if (a === 0 && b === 0 && c === 0) {
      break;
    }

    if (a === b && b === c) {
      result += "Equilateral\n";
      continue;
    }

    if (a + b <= c || b + c <= a || c + a <= b) {
      result += "Invalid\n";
      continue;
    }

    if (a === b || b === c || c === a) {
      result += "Isosceles\n";
      continue;
    }

    result += "Scalene\n";
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
