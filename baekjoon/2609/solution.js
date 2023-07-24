function solution(n1, n2) {
  if (n1 === n2) {
    console.log(`${n1}\n${n1}`);
    return;
  }

  const dividers = [];

  let d = 2;
  while (n1 >= d && n2 >= d) {
    if (n1 % d === 0 && n2 % d === 0) {
      dividers.push(d);
      n1 /= d;
      n2 /= d;
    } else {
      d += 1;
    }
  }

  const gcd = dividers.reduce((acc, it) => acc * it, 1);
  const lcm = gcd * n1 * n2;

  console.log(`${gcd}\n${lcm}`);
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
