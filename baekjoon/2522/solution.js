function solution(n) {
  let result = "";
  for (let i = 1; i <= 2 * n - 1; i++) {
    result += `${" ".repeat(Math.abs(n - i))}${"*".repeat(
      i <= n ? i : i - (i - n) * 2
    )}\n`;
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

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(+item);
  });
} else {
  solution(+input);
}
