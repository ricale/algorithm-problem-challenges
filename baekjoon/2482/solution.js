const MODIFIER = 1_000_000_003;

function solution(n, k) {
  if (k === 1) {
    console.log(n);
    return;
  }
  if (k > n / 2) {
    console.log(0);
    return;
  }
  if (k === n / 2) {
    console.log(2);
    return;
  }

  const answers = [...new Array(n + 1)].map(() => []);

  for (let n2 = 0; n2 <= n; n2++) {
    answers[n2][0] = Math.min(1, n2);
    answers[n2][1] = n2;
  }

  for (let n2 = 2; n2 <= n; n2++) {
    for (let k2 = 2; k2 <= k; k2++) {
      answers[n2][k2] =
        ((answers[n2 - 2][k2 - 1] || 0) + (answers[n2 - 1][k2] || 0)) %
        MODIFIER;
    }
  }
  console.log(`${(answers[n - 3][k - 1] + answers[n - 1][k]) % MODIFIER}`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item) => {
  return +item;
};

if (isLocal) {
  const LINE_COUNT = 2;
  const rows = input
    .split("\n")
    .filter((item) => !!item)
    .reduce((acc, item, i) => {
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(mapper(item));

      return acc;
    }, []);

  rows.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
