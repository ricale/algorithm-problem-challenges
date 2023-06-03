function isPrime(n) {
  for (let i = 3; i < n / (i - 2); i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

function solution(m, n) {
  const result = [];
  const first = m === 1 ? 3 : m % 2 === 0 ? m + 1 : m;

  if (m <= 2) {
    result.push(2);
  }

  for (let i = first; i <= n; i += 2) {
    if (isPrime(i)) {
      result.push(i);
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

if (isLocal) {
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .map((it) =>
      it
        .trim()
        .split(" ")
        .map((it) => +it)
    );

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
