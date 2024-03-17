const COINS = [500, 100, 50, 10, 5, 1];

function solution(n) {
  let total = 0;
  let rest = 1000 - n;

  for (let i = 0; i < COINS.length; i++) {
    const count = Math.floor(rest / COINS[i]);
    total += count;
    rest -= count * COINS[i];
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
    solution(+item);
  });
} else {
  solution(+input);
}
