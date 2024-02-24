function solution(n) {
  let result = "";
  const last = 2 * n - 1;
  for (let i = 1; i <= last; i++) {
    const common =
      i === 1 || i === last ? "*".repeat(n - 1) : `${" ".repeat(n - 2)}*`;

    result += `${" ".repeat(i <= n ? i - 1 : 2 * n - i - 1)}*${common}`;
    result += i === n ? "" : `${" ".repeat(Math.abs(n - i) * 2 - 1)}*`;
    result += common;
    result += `\n`;
  }
  console.log(result);
}

// 3: 3
// 4: 1
// 5: 0
// 6: 1
// 7: 3

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
