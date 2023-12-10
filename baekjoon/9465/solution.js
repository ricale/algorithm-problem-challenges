function getAnswer(n, stickers) {
  const results = [...new Array(2)].map(() => new Array(n + 1).fill(0));

  for (let x = 1; x <= n; x++) {
    for (let y = 0; y < 2; y++) {
      const otherY = 1 - y;
      results[y][x] = Math.max(
        results[otherY][x - 1] + stickers[y][x - 1],
        results[y][x - 1]
      );
    }
  }

  return Math.max(results[0][n], results[1][n]);
}

function solution(t, rows) {
  let result = "";
  for (let i = 0; i < t; i++) {
    const n = rows[i * 3];
    const stickers = rows.slice(i * 3 + 1, i * 3 + 3);
    result += `${getAnswer(n, stickers)}\n`;
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

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const t = +cases[idx++];
  const rows = cases.slice(idx, idx + t * 3).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += t * 3;

  solution(t, rows);
}
