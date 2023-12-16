function solution(n) {
  console.log(n === "0" ? "YONSEI" : "Leading the Way to the Future");
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
    solution(item.trim());
  });
} else {
  solution(input.trim());
}
