function solution(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
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
    .filter((it) => !!it)
    .map((it) => +it);

  cases.forEach((it) => {
    solution(it);
  });
} else {
  solution(+input);
}
