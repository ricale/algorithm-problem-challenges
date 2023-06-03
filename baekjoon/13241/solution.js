function getGcd(a, b) {
  while (b !== 0) {
    let t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function solution(a, b) {
  const [min, max] = a < b ? [a, b] : [b, a];
  const gcd = getGcd(max, min);
  console.log((max / gcd) * min);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const parser = (it) =>
  it
    .trim()
    .split(" ")
    .map((it) => +it);

if (isLocal) {
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .map(parser);

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(...parser(input));
}
