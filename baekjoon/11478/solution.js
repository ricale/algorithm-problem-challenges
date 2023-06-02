function solution(str) {
  const set = new Set();

  for (let i = 0; i < str.length; i++) {
    for (let j = i; j < str.length; j++) {
      set.add(str.slice(i, j + 1));
    }
  }

  console.log(set.size);
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
