function solution(N, K) {
  const k = +K;

  if (N.length < k) {
    console.log("1023456789".slice(0, k));
    return;
  }

  const checked = new Array(10).fill(0);
  let checkedCount = 0;
  for (let i = 0; i < N.length; i++) {
    checked[+N[i]] += 1;
    if (checked[+N[i]] === 1) {
      checkedCount += 1;
    }
  }

  if (checkedCount === k) {
    console.log(N);
    return;
  }

  for (let i = N.length - 1; i >= 0; i--) {
    const n = +N[i];
    checked[n] -= 1;
    if (!checked[n]) {
      checkedCount -= 1;
    }

    for (let cand = n + 1; cand <= 9; cand++) {
      checked[cand] += 1;
      if (checked[cand] === 1) {
        checkedCount += 1;
      }

      if (checkedCount === k) {
        const filled = `${checked.findIndex((it) => it > 0)}`.repeat(
          N.length - i - 1
        );
        console.log(`${N.slice(0, i)}${cand}${filled}`);
        return;
      } else if (checkedCount < k) {
        const restLen = N.length - (i + 1);

        if (k - checkedCount <= restLen) {
          let result = `${N.slice(0, i)}${cand}`;

          for (let j = 0; j < restLen; j++) {
            const checkedMin = checked.findIndex((it) => it > 0);
            if (checkedCount === k) {
              result = `${result}${checkedMin}`;
              continue;
            }
            const res = checked.findIndex((it) => it === 0);
            if (res > checkedMin && k - checkedCount < restLen - j) {
              result = `${result}${checkedMin}`;
            } else {
              checked[res] += 1;
              checkedCount += 1;
              result = `${result}${res}`;
            }
          }

          console.log(result);
          return;
        }
      }

      checked[cand] -= 1;
      if (!checked[cand]) {
        checkedCount -= 1;
      }
    }
  }

  const length = N.length + 1;

  console.log(`1${"0".repeat(length - (k - 1))}23456789`.slice(0, length));
}

//////
////
// input

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString();

const cases = input
  .split("\n")
  .filter((it) => !!it)
  .map((it) => it.trim().split(" "));

cases.forEach((it) => {
  solution(...it);
});
