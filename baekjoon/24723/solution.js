function solution(n) {
  console.log(Math.pow(2, n));
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
