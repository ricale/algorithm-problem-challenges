function solution(rows) {
  let result = "";

  const sieve = new Array(1_000_001).fill(true);
  sieve[0] = false;
  sieve[1] = false;

  for (let i = 2; i <= 1_000_000; i++) {
    if (!sieve[i]) {
      continue;
    }

    for (let j = i + i; j <= 1_000_000; j += i) {
      sieve[j] = false;
    }
  }

  for (let n of rows) {
    if (n === 0) {
      break;
    }
    for (let i = 3; i <= 499_999; i++) {
      if (sieve[i] && sieve[n - i]) {
        result += `${n} = ${i} + ${n - i}\n`;
        break;
      }
    }
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

const rows = input
  .split("\n")
  .filter((item) => !!item)
  .map((item) => +item);
solution(rows);
