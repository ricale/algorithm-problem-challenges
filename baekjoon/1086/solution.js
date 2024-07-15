// BigInt 를 사용해도 되지만 한 번 구현해보자
function mod(target, divider) {
  let result = 0;
  const len = `${target}`.length;
  for (let i = 0; i < len; i++) {
    result *= 10;
    result = (result + +target[i]) % divider;
  }
  return result;
}

function gcd(a, b) {
  while (a >= b) {
    if (a % b === 0) {
      return b;
    }
    a = a % b;
    [a, b] = [b, a];
  }
}

function solution(n, nums, k) {
  const answer = [...new Array(1 << n)].map(() => new Array(k).fill(0));
  answer[0][0] = 1;

  const tens = [1 % k];
  for (let i = 1; i <= 50; i++) {
    tens[i] = (tens[i - 1] * (10 % k)) % k;
  }

  const divided = [];
  for (let i = 0; i < n; i++) {
    divided[i] = mod(nums[i], k);
  }

  const maxState = 1 << n;
  for (let state = 0; state < maxState; state++) {
    for (let i = 0; i < n; i++) {
      if ((state & (1 << i)) !== 0) {
        continue;
      }

      const nextState = state | (1 << i);

      for (let k2 = 0; k2 < k; k2++) {
        const nextK = (((k2 * tens[nums[i].length]) % k) + divided[i]) % k;
        answer[nextState][nextK] += answer[state][k2];
      }
    }
  }

  const count = answer[(1 << n) - 1][0];
  if (count === 0) {
    console.log("0/1");
    return;
  }

  const factorial = [...new Array(n)].reduce((acc, _, i) => acc * (i + 1), 1);
  const divider = gcd(factorial, count);

  console.log(`${count / divider}/${factorial / divider}`);
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
    return item;
  });
  idx += n;
  const k = +cases[idx++];

  solution(n, rows, k);
}
