function solution(binary) {
  const result = [];

  const digits = binary.split("").reverse();
  for (let i = 0; i < digits.length; i++) {
    const idx = Math.floor(i / 3);
    result[idx] = (result[idx] || 0) + digits[i] * Math.pow(2, i % 3);
  }
  console.log(result.reverse().join(""));
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
    solution(...item.trim().split(" "));
  });
} else {
  solution(...input.trim().split(" "));
}
