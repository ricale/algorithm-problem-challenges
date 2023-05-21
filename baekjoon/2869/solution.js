function solution(A, B, V) {
  const up = +A;
  const down = +B;
  const height = +V;

  if (up > height) {
    console.log(1);
    return;
  }

  console.log(Math.ceil((height - up) / (up - down)) + 1);
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
