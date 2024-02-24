function solution(n) {
  const line = new Array(n).fill("*").join(" ");
  let result = "";
  for (let i = 1; i <= n; i++) {
    result += `${i % 2 === 0 ? " " : ""}${line}\n`;
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
