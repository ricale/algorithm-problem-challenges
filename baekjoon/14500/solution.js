function getCands(i, j) {
  return [
    [
      // ㅣ 1
      [i, j + 1],
      [i, j + 2],
      [i, j + 3],
    ],
    [
      // ㅣ 2
      [i + 1, j],
      [i + 2, j],
      [i + 3, j],
    ],
    [
      // ㅁ
      [i, j + 1],
      [i + 1, j + 1],
      [i + 1, j],
    ],
    [
      // ㅜ 1
      [i, j + 1],
      [i, j + 2],
      [i + 1, j + 1],
    ],
    [
      // ㅜ 2
      [i, j + 1],
      [i, j + 2],
      [i - 1, j + 1],
    ],
    [
      // ㅜ 3
      [i + 1, j],
      [i + 2, j],
      [i + 1, j + 1],
    ],
    [
      // ㅜ 4
      [i + 1, j],
      [i + 2, j],
      [i + 1, j - 1],
    ],
    [
      // ㄱㄴ 1
      [i + 1, j],
      [i + 1, j + 1],
      [i + 2, j + 1],
    ],
    [
      // ㄱㄴ 2
      [i + 1, j],
      [i + 1, j - 1],
      [i + 2, j - 1],
    ],
    [
      // ㄱㄴ 3
      [i, j + 1],
      [i + 1, j + 1],
      [i + 1, j + 2],
    ],
    [
      // ㄱㄴ 4
      [i, j + 1],
      [i - 1, j + 1],
      [i - 1, j + 2],
    ],
    [
      [i + 1, j],
      [i + 2, j],
      [i + 2, j + 1],
    ],
    [
      [i + 1, j],
      [i + 2, j],
      [i + 2, j - 1],
    ],
    [
      [i - 1, j],
      [i - 2, j],
      [i - 2, j + 1],
    ],
    [
      [i - 1, j],
      [i - 2, j],
      [i - 2, j - 1],
    ],
    [
      [i, j + 1],
      [i, j + 2],
      [i + 1, j + 2],
    ],
    [
      [i, j + 1],
      [i, j + 2],
      [i - 1, j + 2],
    ],
    [
      [i, j - 1],
      [i, j - 2],
      [i + 1, j - 2],
    ],
    [
      [i, j - 1],
      [i, j - 2],
      [i - 1, j - 2],
    ],

    [
      [i + 1, j],
      [i + 1, j + 1],
      [i + 1, j + 2],
    ],
    [
      [i + 1, j],
      [i + 1, j - 1],
      [i + 1, j - 2],
    ],
    [
      [i, j + 1],
      [i + 1, j + 1],
      [i + 2, j + 1],
    ],
    [
      [i, j + 1],
      [i - 1, j + 1],
      [i - 2, j + 1],
    ],
    [
      [i - 1, j],
      [i - 1, j + 1],
      [i - 1, j + 2],
    ],
    [
      [i - 1, j],
      [i - 1, j - 1],
      [i - 1, j - 2],
    ],
    [
      [i, j - 1],
      [i + 1, j - 1],
      [i + 2, j - 1],
    ],
    [
      [i, j - 1],
      [i - 1, j - 1],
      [i - 2, j - 1],
    ],
  ];
}

function solution(n, m, rows) {
  let max = 0;
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      const cands = getCands(i, j);
      for (const coords of cands) {
        let sum = rows[i][j];
        for (const [y, x] of coords) {
          if (y >= 0 && y < n && x >= 0 && x < m) {
            sum += rows[y][x];
          } else {
            sum = -1;
            break;
          }
        }
        max = Math.max(max, sum);
      }
    }
  }
  console.log(max);
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
  const [n, m] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, m, rows);
}
