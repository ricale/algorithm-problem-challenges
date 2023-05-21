function solution(input) {
  const X = +input;

  let scale = 1;
  let a = 1;
  while (X > a) {
    scale += 1;
    a += scale;
  }
  const min = scale + X - a;
  const max = 1 - X + a;

  console.log(scale % 2 === 0 ? `${min}/${max}` : `${max}/${min}`);
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
