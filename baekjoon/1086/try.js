function solution(n, nums, k) {
  const answers = [...new Array(n)].map(() =>
    new Array(Math.pow(2, n)).fill(undefined)
  );
  let result = 0;
  const getAnswer = (current, d, state) => {
    console.log({ current, d, state });
    if (state === (1 << n) - 1) {
      result += 1;
      return true;
    }

    if (answers[current][state] !== undefined) {
      return answers[current][state];
    }

    if (((nums[current] % k) * (BigInt(Math.pow(10, d)) % k)) % k !== 0) {
      answers[current][state] = false;
      return answers[current][state];
    }

    const nextD = d + nums[current].toString().length;
    let can = false;
    for (let i = 0; i < n; i++) {
      const bit = 1 << i;
      if ((state & bit) > 0) {
        continue;
      }

      if (getAnswer(i, nextD, state | bit)) {
        can = true;
      }
    }

    answers[state] = can;
    return answers[state];
  };

  for (let i = 0; i < n; i++) {
    getAnswer(i, 0, 1 << i);
  }

  console.log(result);
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return BigInt(item);
  });
  idx += n;
  const k = BigInt(cases[idx++]);

  solution(n, rows, k);
}
