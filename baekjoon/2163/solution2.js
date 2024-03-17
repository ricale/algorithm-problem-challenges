function getAnswer(a, b) {
  if (b === 1) {
    if (a === 1) return 0;
    if (a === 2) return 1;
  }

  const a1 = Math.ceil(a / 2);
  const a2 = Math.floor(a / 2);

  const p1 = a1 > b ? [a1, b] : [b, a1];
  const p2 = a2 > b ? [a2, b] : [b, a2];

  return 1 + getAnswer(...p1) + getAnswer(...p2);
}

function solution(n, m) {
  const [a, b] = n > m ? [n, m] : [m, n];
  console.log(getAnswer(a, b));
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
