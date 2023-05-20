function solution(word) {
  const checked = new Map();
  let maxCount = 0;
  let max = [];
  for (let i = 0; i < word.length; i++) {
    const c = word[i].toUpperCase();
    const count = (checked.get(c) ?? 0) + 1;
    if (maxCount < count) {
      maxCount = count;
      max = [c];
    } else if (maxCount === count) {
      max.push(c);
    }
    checked.set(c, count);
  }

  console.log(max.length > 1 ? "?" : max[0]);
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
