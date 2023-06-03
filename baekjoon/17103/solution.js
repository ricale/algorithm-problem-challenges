function solution(n, rows) {
  const max = Math.max(...rows);
  const primes = [false, false];
  for (let i = 2; i < max; i++) {
    if (primes[i] === false) {
      continue;
    }
    primes[i] = true;
    for (let j = i + i; j < max; j += i) {
      primes[j] = false;
    }
  }

  const result = [];
  for (let num of rows) {
    let count = 0;
    for (let i = 2; i <= num / 2; i++) {
      if (primes[i] && primes[num - i]) {
        count += 1;
      }
    }
    result.push(count);
  }

  console.log(result.join("\n"));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    return +it;
  });
  solution(n, rows);

  idx += n + offset;
}
