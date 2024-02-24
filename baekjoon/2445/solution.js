function solution(n) {
  for (let i = 1; i <= 2 * n - 1; i++) {
    const asts = "*".repeat(n - Math.abs(n - i));
    console.log(`${asts}${" ".repeat(Math.abs(n - i) * 2)}${asts}`);
  }
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
