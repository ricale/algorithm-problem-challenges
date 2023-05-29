function solution(N) {
  const n = +N;

  if (n % 5 === 0) {
    console.log(n / 5);
    return;
  }

  if (n % 5 === 1) {
    console.log(2 + (n - 6) / 5);
    return;
  }

  if (n % 5 === 2) {
    console.log(n < 12 ? -1 : 4 + (n - 12) / 5);
    return;
  }

  if (n % 5 === 3) {
    console.log(1 + (n - 3) / 5);
    return;
  }

  if (n % 5 === 4) {
    console.log(n < 9 ? -1 : 3 + (n - 9) / 5);
    return;
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
