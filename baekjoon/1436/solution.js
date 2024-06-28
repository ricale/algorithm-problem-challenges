function solution(N) {
  const n = +N;

  let count = 0;
  for (let i = 666; ; i++) {
    if (`${i}`.match("666")) {
      count += 1;
      if (count === n) {
        console.log(i);
        return;
      }
    }
  }
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
