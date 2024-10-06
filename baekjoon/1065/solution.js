function solution(num) {
  if (num <= 99) {
    console.log(num);
    return;
  }

  let result = 99;
  for (let i = 100; i <= Math.min(num, 999); i++) {
    const digits = `${i}`.split("").map((it) => +it);
    if (digits[0] - digits[1] === digits[1] - digits[2]) {
      result += 1;
    }
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
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(+item);
  });
} else {
  solution(+input);
}
