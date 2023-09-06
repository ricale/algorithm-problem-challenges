function solution(n) {
  const answers = [0, 1, 2];

  for (let i = 3; i <= n; i++) {
    answers[i] = (answers[i - 1] + answers[i - 2]) % 10007;
  }

  console.log(answers[n]);
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
    solution(+item.trim());
  });
} else {
  solution(+input.trim());
}
