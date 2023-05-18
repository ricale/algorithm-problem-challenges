function solution(word) {
  const length = word.length;
  const middle = length / 2;
  for (let i = 0; i < middle; i++) {
    if (word[i] !== word[length - 1 - i]) {
      console.log("0");
      return;
    }
  }
  console.log("1");
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
    .filter((it) => !!it)
    .map((it) => it.trim().split(" "));

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(...input.trim().split(" "));
}
