function solution(n) {
  const answers = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  for (let i = 1; i < n; i++) {
    const prev = (i - 1) * 10;
    const curr = i * 10;
    answers[curr] = 0;
    for (let j = 1; j <= 8; j++) {
      answers[curr + j] =
        (answers[prev + j - 1] + answers[prev + j + 1]) % 1000000000;
    }
    answers[curr + 0] = answers[prev + 1];
    answers[curr + 9] = answers[prev + 8];
  }

  const result = answers
    .slice((n - 1) * 10 + 1, n * 10)
    .reduce((acc, it) => (acc + it) % 1000000000, 0);

  console.log(result);
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
