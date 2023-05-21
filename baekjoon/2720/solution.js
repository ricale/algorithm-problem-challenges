function solution(n, rows) {
  const coins = [25, 10, 5, 1];
  for (let [amount] of rows) {
    let result = "";
    for (let coin of coins) {
      result += `${Math.floor(amount / coin)} `;
      amount = amount % coin;
    }
    console.log(result);
  }
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases
    .slice(idx + offset, idx + n + offset)
    .map((it) => it.trim().split(" "));
  solution(n, rows);

  idx += n + offset;
}
