function solution(n) {
  const firstLine = new Array(Math.ceil(n / 2)).fill("*").join(" ");
  const secondLine = " *".repeat(Math.floor(n / 2));
  console.log(`${firstLine}\n${secondLine}\n`.repeat(n));
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
