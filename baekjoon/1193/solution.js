function getNthValue(X, from) {
  let scale = from;
  let a = from;
  while (a < X) {
    scale += 4;
    a += scale;
  }

  const first = a - scale + 1;
  const last = a;
  const middle = (first + last) / 2;
  const high = Math.floor(scale / 2) + 1;

  return X > middle ? high - (X - middle) : X - (a - scale);
}

function solution(input) {
  const X = +input;

  console.log(`${getNthValue(X, 1)}/${getNthValue(X, 3)}`);
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
    .map((it) => it.trim().split(" "));

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(...input.trim().split(" "));
}
