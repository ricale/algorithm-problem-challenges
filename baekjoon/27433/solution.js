function solution(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
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
  const cases = input
    .split("\n")
    .filter((item) => !!item)
    .map((item) => +item);

  cases.forEach((item) => {
    solution(item);
  });
} else {
  solution(+input);
}
