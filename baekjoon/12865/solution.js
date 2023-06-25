function solution(n, k, rows) {
  const answers = [...new Array(n + 1)].map(() => new Array(k + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      const [weight, value] = rows[i - 1];
      answers[i][j] = Math.max(
        answers[i - 1][j],
        j >= weight ? answers[i - 1][j - weight] + value : 0
      );
    }
  }

  console.log(answers[n][k]);
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
  const [n, k] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, k, rows);

  idx += n + offset;
}
