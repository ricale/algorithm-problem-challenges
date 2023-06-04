function hanoi(count, from, by, to, result) {
  if (count === 1) {
    result.push(`${from} ${to}`);
    return;
  }

  hanoi(count - 1, from, to, by, result);
  result.push(`${from} ${to}`);
  hanoi(count - 1, by, from, to, result);
}

function solution(n) {
  const result = [];
  hanoi(n, "1", "2", "3", result);
  console.log(`${result.length}\n${result.join("\n")}`);
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
