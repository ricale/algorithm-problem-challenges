function solution() {
  // code
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input
    .split("\n")
    .filter((item) => !!item)
    .map((item) => item.trim().split(" "));

  cases.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.trim().split(" "));
}
