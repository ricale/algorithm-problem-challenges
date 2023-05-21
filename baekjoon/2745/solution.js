function solution(N, B) {
  const system = +B;
  let scale = 1;
  let result = 0;

  const charCodeBase = "A".charCodeAt(0);
  for (let i = N.length - 1; i >= 0; i--) {
    const n = !isNaN(+N[i]) ? +N[i] : N[i].charCodeAt(0) - charCodeBase + 10;
    result += n * scale;
    scale *= system;
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
