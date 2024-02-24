function solution(n) {
  let result = "";
  for (let i = 1; i <= n; i++) {
    result += `${" ".repeat(i - 1)}${"*".repeat(2 * n - (i * 2 - 1))}\n`;
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
