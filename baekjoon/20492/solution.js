function solution(money) {
  console.log(`${money * 0.78} ${money * 0.8 + money * 0.2 * 0.78}`);
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
    solution(item.trim());
  });
} else {
  solution(input.trim());
}
