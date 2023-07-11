function solution(n, k) {
  if (n - k < k) {
    k = n - k;
  }
  const answers = [...new Array(n + 1)].map((_, i) =>
    [...new Array(k + 1)].map((_, j) => (j === 0 ? 1 : j === 1 ? i : 0))
  );
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      if (i < j) {
        continue;
      }
      answers[i][j] = (answers[i - 1][j - 1] + answers[i - 1][j]) % 10007;
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

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(
      ...item
        .trim()
        .split(" ")
        .map((it) => +it)
    );
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
