function solution(n) {
  if (n === 1) {
    console.log(n);
    return;
  }

  let prev = 1;
  let curr = 2;

  for (let i = 3; i <= n; i++) {
    [prev, curr] = [curr, (prev + curr) % 15746];
  }
  console.log(curr);
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
    solution(+item);
  });
} else {
  solution(+input);
}
