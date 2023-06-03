function isPrime(n) {
  for (let i = 3; i < n / (i - 2); i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function solution(n, rows) {
  const result = [];
  for (let n of rows) {
    if (n <= 2) {
      result.push(2);
      continue;
    }

    const first = n % 2 === 0 ? n + 1 : n;

    for (let i = first; ; i += 2) {
      if (isPrime(i)) {
        result.push(i);
        break;
      }
    }
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
