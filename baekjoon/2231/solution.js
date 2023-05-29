function solution(n) {
  const len = n.length;
  const num = +n;

  const first = Math.max(num - 9 * len, 1);
  for (let i = first; i < num; i++) {
    const sum = i + `${i}`.split("").reduce((acc, it) => acc + +it, 0);
    if (sum === num) {
      console.log(i);
      return;
    }
  }

  console.log(0);
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
