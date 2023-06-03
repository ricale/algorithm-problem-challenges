function getGcd(a, b) {
  while (b !== 0) {
    let t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function solution([n1, n2], [m1, m2]) {
  const [min, max] = n2 < m2 ? [n2, m2] : [m2, n2];
  const gcd1 = getGcd(max, min);

  const divisor = (max / gcd1) * min;
  const num = (n1 * m2) / gcd1 + (n2 * m1) / gcd1;

  const gcd2 = getGcd(divisor, num);

  console.log(`${num / gcd2} ${divisor / gcd2}`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (it) =>
  it
    .trim()
    .split(" ")
    .map((it) => +it);

if (isLocal) {
  const LINE_COUNT = 2;
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .reduce((acc, it, i) => {
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(mapper(it));

      return acc;
    }, []);

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
