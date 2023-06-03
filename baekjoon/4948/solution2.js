// https://www.acmicpc.net/source/12761412 로직 따라해봄

function solution(rows) {
  const primes = [false, false];
  const max = 123456 * 2;

  for (let i = 2; i <= max; i++) {
    if (primes[i] === false) {
      continue;
    }
    primes[i] = true;
    for (let j = i + i; j <= max; j += i) {
      primes[j] = false;
    }
  }

  const result = [];
  for (const n of rows) {
    if (n === 0) {
      break;
    }
    if (n === 1) {
      result.push(1);
      continue;
    }
    const first = (n + 1) % 2 === 0 ? n + 2 : n + 1;
    const last = n * 2;
    let count = 0;
    for (let i = first; i <= last; i += 2) {
      if (primes[i]) {
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

const cases = input
  .split("\n")
  .filter((it) => !!it)
  .map((it) => +it);
solution(cases);
