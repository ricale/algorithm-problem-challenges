function getMax(stickers, i = 0, j = 0, sum = 0) {
  if (j >= stickers[0].length) {
    return sum;
  }

  sum += stickers[i][j];

  const otherI = 1 - i;

  return Math.max(
    getMax(stickers, otherI, j + 1, sum),
    getMax(stickers, otherI, j + 2, sum)
  );
}

// brute-force
function solution(t, rows) {
  let result = "";
  for (let i = 0; i < t; i++) {
    const stickers = rows.slice(i * 3 + 1, i * 3 + 3);

    result += `${Math.max(getMax(stickers, 0, 0), getMax(stickers, 1, 0))}\n`;
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
