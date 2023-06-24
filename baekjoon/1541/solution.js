function solution(expression) {
  const splitted = expression.split("-");

  let result = 0;
  for (let i = 0; i < splitted.length; i++) {
    const subsum = splitted[i].split("+").reduce((acc, it) => acc + +it, 0);
    if (i === 0) {
      result += subsum;
    } else {
      result -= subsum;
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
    solution(item);
  });
} else {
  solution(input);
}
