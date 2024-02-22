function solution(w, h) {
  console.log(((w * h) / 2).toFixed(1));
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
