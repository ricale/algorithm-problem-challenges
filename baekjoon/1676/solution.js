const M = 100000000;

function solution(n) {
  let result = 0;
  let num = 1;
  for (let i = 1; i <= n; i++) {
    num = (num * i) % M;
    const hasZero = `${num}`.match(/0+$/);
    if (hasZero) {
      const count = hasZero[0].length;
      result += count;
      num = +`${num}`.slice(0, -count);
    }
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
    solution(...item.trim().split(" "));
  });
} else {
  solution(...input.trim().split(" "));
}
