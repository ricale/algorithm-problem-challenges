function solution(n) {
  const contain7 = `${n}`.indexOf("7") !== -1;
  const divisibleBy7 = n % 7 === 0;
  console.log(
    contain7 && divisibleBy7 ? 3 : contain7 ? 2 : divisibleBy7 ? 1 : 0
  );
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
