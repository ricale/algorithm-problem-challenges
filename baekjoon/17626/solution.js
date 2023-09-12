const mem = { 1: 1 };

function getAnswer(n) {
  if (mem[n]) {
    return mem[n];
  }

  let cand = Math.floor(Math.sqrt(n));

  if (cand === Math.sqrt(n)) {
    mem[n] = 1;
    return 1;
  }

  let min = Infinity;
  for (let i = cand; i >= 1; i--) {
    min = Math.min(min, 1 + getAnswer(n - i * i));
  }

  mem[n] = min;
  return min;
}

function solution(n) {
  console.log(getAnswer(n));
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
    solution(+item.trim());
  });
} else {
  solution(+input.trim());
}
