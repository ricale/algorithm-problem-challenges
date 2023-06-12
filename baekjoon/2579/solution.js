function solution(n, scores) {
  const sums = [[0, scores[0], 0]];

  for (let i = 1; i < scores.length; i++) {
    const lastSum = sums[i - 1];
    sums[i] = [
      0 + Math.max(lastSum[1], lastSum[2]),
      scores[i] + lastSum[0],
      scores[i] + lastSum[1],
    ];
  }

  console.log(Math.max(...sums[sums.length - 1].slice(1)));
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
