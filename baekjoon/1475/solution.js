function solution(n) {
  const counts = new Array(9).fill(0);
  for (const digit of n) {
    counts[digit === "9" ? 6 : +digit] += 1;
  }
  counts[6] = Math.ceil(counts[6] / 2);
  console.log(Math.max(...counts));
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
    solution(item.split(""));
  });
} else {
  solution(input.split(""));
}
