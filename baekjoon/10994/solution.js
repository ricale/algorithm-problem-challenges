function recur(n) {
  if (n === 1) {
    return ["*"];
  }

  const last = recur(n - 1);

  const middles = last.map((line) => `* ${line} *`);
  const first = "*".repeat((n - 1) * 4 + 1);
  const second = `*${" ".repeat((n - 1) * 4 - 1)}*`;

  return [first, second, ...middles, second, first];
}

function solution(n) {
  console.log(recur(n).join("\n"));
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
    solution(+item);
  });
} else {
  solution(+input);
}
