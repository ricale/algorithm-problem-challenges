function solution(n) {
  const answers = [0, 0];
  if (n <= 1) {
    console.log(0);
    return;
  }
  for (let i = 1; i < n; i++) {
    const count = answers[i] + 1;
    const cands = [i + 1, i * 2, i * 3];
    for (let cand of cands) {
      if (cand > n) {
        continue;
      }
      if (!answers[cand] || answers[cand] > count) {
        answers[cand] = count;
      }
    }
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
    solution(+item);
  });
} else {
  solution(+input);
}
