function solution(n) {
  let result = 0n;
  for (let i = 1n; i < n; i++) {
    result += n * i + i;
  }
  console.log(`${result}`);
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
    solution(BigInt(item));
  });
} else {
  solution(BigInt(input));
}
