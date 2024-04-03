function solution(s) {
  let sum = BigInt(0);
  let i = BigInt(0);
  while (sum < s) {
    i += 1n;
    sum += i;
  }
  console.log(`${sum === s ? i : i - 1n}`);
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
