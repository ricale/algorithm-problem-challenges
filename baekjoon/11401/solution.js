const MODER = BigInt(1000000007);

function dnq(n, m) {
  if (m === 1) {
    return n;
  }

  const rest = m % 2;
  const mid = Math.floor(m / 2);
  const subResult = dnq(n, mid);

  return (subResult * subResult * (rest ? n : 1n)) % MODER;
}

function solution(n, k) {
  let subResult1 = 1n;
  for (let i = k + 1; i <= n; i++) {
    subResult1 = (subResult1 * BigInt(i)) % MODER;
  }

  let subResult2 = 1n;
  for (let i = 2; i <= n - k; i++) {
    subResult2 = (subResult2 * BigInt(i)) % MODER;
  }

  const result = (subResult1 * dnq(subResult2, 1000000005)) % MODER;
  console.log(`${result}`);
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
    solution(
      ...item
        .trim()
        .split(" ")
        .map((it) => +it)
    );
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
