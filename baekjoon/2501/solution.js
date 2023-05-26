function solution(N, K) {
  const num = +N;
  let k = +K;
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      k -= 1;
      if (k === 0) {
        console.log(i);
        return;
      }
    }
  }
  console.log(0);
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
