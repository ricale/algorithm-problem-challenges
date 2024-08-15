const MOD = 1_000_000_000;

function solution(n) {
  const answer = [...new Array(n)].map(() =>
    [...new Array(10)].map(() => new Array(1 << 10).fill(0))
  );

  for (let current = 1; current < 10; current++) {
    answer[0][current][1 << current] = 1;
  }

  for (let digit = 1; digit < n; digit++) {
    for (let current = 0; current < 10; current++) {
      for (let state = 0; state < 1 << 10; state++) {
        answer[digit][current][state | (1 << current)] +=
          ((current > 0 ? answer[digit - 1][current - 1][state] : 0) +
            (current < 9 ? answer[digit - 1][current + 1][state] : 0)) %
          MOD;
        answer[digit][current][state | (1 << current)] %= MOD;
      }
    }
  }

  console.log(
    answer[n - 1].reduce(
      (acc, lastDigit) => (acc + lastDigit[(1 << 10) - 1]) % MOD,
      0
    )
  );
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
