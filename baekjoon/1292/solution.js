function solution(a, b) {
  let total = 0;
  let current = 1;
  let k = current;
  for (let i = 1; i <= b; i++) {
    if (i >= a) {
      total += current;
    }
    k -= 1;
    if (k === 0) {
      current += 1;
      k = current;
    }
  }

  console.log(total);
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
