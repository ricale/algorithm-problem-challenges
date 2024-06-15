function solution(n) {
  for (let i = n; i >= 4; i--) {
    const digits = `${i}`.split("");
    if (digits.filter((digit) => !["4", "7"].includes(digit)).length === 0) {
      console.log(i);
      return;
    }
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
