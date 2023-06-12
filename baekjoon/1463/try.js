function solution(n) {
  const answers = [0, 0, 1, 1];
  if (answers.length >= n) {
    console.log(answers[n]);
  }

  let lastNums = new Set([2, 3]);
  let count = 2;

  while (answers[n] === undefined) {
    let nums = new Set();
    for (const lastNum of lastNums.values()) {
      const cands = [lastNum + 1, lastNum * 2, lastNum * 3];
      for (const cand of cands) {
        if (cand === n) {
          console.log(count);
          return;
        }
        if (!answers[cand]) {
          answers[cand] = count;
          nums.add(cand);
        }
      }
    }

    lastNums = nums;
    count += 1;
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
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(+item);
  });
} else {
  solution(+input);
}
