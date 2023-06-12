function solution(n, nums) {
  const answers = [[0, nums[0], 0]];

  for (let i = 1; i < n; i++) {
    answers[i] = [
      Math.max(...answers[i - 1]),
      answers[i - 1][0] + nums[i],
      answers[i - 1][1] + nums[i],
    ];
  }

  console.log(Math.max(...answers[n - 1]));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return +item;
  });
  solution(n, rows);

  idx += n + offset;
}
