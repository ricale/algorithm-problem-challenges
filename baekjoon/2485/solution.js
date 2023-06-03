function getGcd(a, b) {
  while (b !== 0) {
    let t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function solution(n, rows) {
  let hash = new Map();

  for (let i = 0; i < n - 1; i++) {
    const gap = rows[i + 1] - rows[i];
    hash.set(gap, (hash.get(gap) ?? 0) + 1);
  }

  const gaps = [...hash.keys()];
  let gcd = gaps[0];

  for (let i = 1; i < gaps.length; i++) {
    const [a, b] = gaps[i] > gcd ? [gaps[i], gcd] : [gcd, gaps[i]];
    gcd = getGcd(a, b);
  }

  let result = 0;
  for (const [gap, count] of hash.entries()) {
    result += (gap / gcd - 1) * count;
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
