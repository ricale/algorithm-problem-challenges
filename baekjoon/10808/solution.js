function solution(s) {
  const alphabets = new Array(26).fill(0);
  for (const ch of s) {
    alphabets[ch.charCodeAt(0) - "a".charCodeAt(0)] += 1;
  }
  console.log(alphabets.join(" "));
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
