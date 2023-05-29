function solution(n) {
  const n1 = BigInt(n);
  const n2 = BigInt(n - 1);
  const two = BigInt(2);
  const n3 = BigInt(n - 2);
  const three = BigInt(3);
  const answer = BigInt((((n1 * n2) / two) * n3) / three);
  console.log(`${answer}\n3`);
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
    .map((it) => it.trim().split(" "));

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(...input.trim().split(" "));
}
