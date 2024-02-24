function solution(n) {
  let result = "";
  for (let i = 1; i <= n; i++) {
    result += `${" ".repeat(n - i)}*`;
    result +=
      i === 1
        ? ""
        : i === n
        ? "*".repeat((i - 1) * 2)
        : `${" ".repeat((i - 1) * 2 - 1)}*`;
    result += `\n`;
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
