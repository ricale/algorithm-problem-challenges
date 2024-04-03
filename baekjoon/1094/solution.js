function solution(x) {
  let stick = 64;
  let count = 0;

  while (x !== 0) {
    if (stick > x) {
      stick /= 2;
    } else {
      x -= stick;
      count += 1;
    }
  }

  console.log(count);
  return;
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
