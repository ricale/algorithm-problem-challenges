function solution(str) {
  let last = "";
  let height = 0;
  for (let i = 0; i < str.length; i++) {
    height += last === str[i] ? 5 : 10;
    last = str[i];
  }
  console.log(height);
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
