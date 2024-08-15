const MOD = 1_000_000_000n;

function solution(n) {
  const answer = [...new Array(n)].map(() => new Array(1 << 9).fill(0n));

  const getAnswer = (digit, state, current) => {
    const count = state
      .toString(2)
      .split("")
      .filter((ch) => ch === "1").length;
    // console.log({ digit, state: state.toString(2), count, current });
    if (digit === 0) {
      return state === (1 << 10) - 1 ? 1n : 0n;
    }

    if (digit < 10 - count) {
      return 0n;
    }

    if (answer[digit][state]) {
      return answer[digit][state];
    }

    const nextDigit = digit - 1;
    const left = current - 1;
    const right = current + 1;
    answer[digit][state] =
      ((current > 0 ? getAnswer(nextDigit, state | (1 << left), left) : 0n) +
        (current < 9
          ? getAnswer(nextDigit, state | (1 << right), right)
          : 0n)) %
      MOD;
    return answer[digit][state];
  };

  let result = 0n;
  for (let i = 1; i <= 9; i++) {
    const subResult = getAnswer(n - 1, 1 << i, i);
    result += subResult % MOD;
  }
  console.log(result.toString());

  // console.log(
  //   answer.map((row) =>
  //     row
  //       .map((item, idx) => [item, idx.toString(2)])
  //       .filter(([item]) => item > 0)
  //   )
  // );
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
