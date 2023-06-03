function isPrime(n) {
  for (let i = 3; i < n / (i - 2); i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function solution(rows) {
  const result = [];
  for (let n of rows) {
    if (n === 0) {
      break;
    }
    if (n === 1) {
      result.push(1);
      continue;
    }

    let count = 0;
    const first = (n + 1) % 2 === 0 ? n + 2 : n + 1;
    for (let i = first; i <= n * 2; i += 2) {
      if (isPrime(i)) {
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

const rows = cases.map((it) => {
  return +it;
});
solution(rows);
