function solution(n, r, c) {
  const big = Math.max(r, c);

  let pow = 0;
  while (Math.pow(2, pow + 1) <= big) {
    pow += 1;
  }

  let result = 0;
  while (pow >= 0) {
    const center = Math.pow(2, pow) - 1;
    const base = Math.pow(4, pow);

    if (r > center && c > center) {
      result += base * 3;
      r -= center + 1;
      c -= center + 1;
    } else if (r > center) {
      result += base * 2;
      r -= center + 1;
    } else if (c > center) {
      result += base;
      c -= center + 1;
    }

    pow -= 1;
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
