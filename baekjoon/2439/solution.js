function solution(N) {
  const n = +N;
  let result = "";
  for (let i = 1; i <= n; i++) {
    result += " ".repeat(n - i) + "*".repeat(i) + "\n";
  }
  console.log(result);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString();

if (isLocal) {
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .map((it) => it.trim().split(" "));

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(input.trim().split(" "));
}
