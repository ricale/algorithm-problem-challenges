function solution(n, m, k, rows) {
  const bArr = [];
  const wArr = [];

  for (let i = 0; i < n; i++) {
    bArr.push([]);
    wArr.push([]);
    for (let j = 0; j < m; j++) {
      const b = (i + j) % 2 === 0 ? "B" : "W";
      const w = (i + j) % 2 === 0 ? "W" : "B";
      bArr[i][j] = rows[i][j] === b ? 0 : 1;
      wArr[i][j] = rows[i][j] === w ? 0 : 1;
    }
  }

  const bArrSum = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));
  const wArrSum = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      bArrSum[i][j] =
        bArrSum[i][j - 1] +
        bArrSum[i - 1][j] -
        bArrSum[i - 1][j - 1] +
        bArr[i - 1][j - 1];
      wArrSum[i][j] =
        wArrSum[i][j - 1] +
        wArrSum[i - 1][j] -
        wArrSum[i - 1][j - 1] +
        wArr[i - 1][j - 1];
    }
  }

  let min = Infinity;
  for (let i = 0; i <= n - k; i++) {
    for (let j = 0; j <= m - k; j++) {
      const y = i + k;
      const x = j + k;
      const bSum =
        bArrSum[y][x] - bArrSum[y][j] - bArrSum[i][x] + bArrSum[i][j];
      const wSum =
        wArrSum[y][x] - wArrSum[y][j] - wArrSum[i][x] + wArrSum[i][j];
      min = Math.min(min, bSum, wSum);
    }
  }

  console.log(min);
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
  const [n, m, k] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item.trim();
  });
  solution(n, m, k, rows);

  idx += n + offset;
}
