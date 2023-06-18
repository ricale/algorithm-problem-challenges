function solution(n, m, rows) {
  const counts = [...new Array(n + 1)].map(() => new Array(m + 1).fill(0));
  counts[1][1] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (i === 1 && j === 1) {
        continue;
      }

      const current = rows[i - 1][j - 1];
      const above = rows[i - 2]?.[j - 1] ?? 0;
      const left = rows[i - 1]?.[j - 2] ?? 0;
      const below = rows[i]?.[j - 1] ?? 0;
      const right = rows[i - 1]?.[j] ?? 0;

      if (current < above) counts[i][j] += 1;
      if (current < left) counts[i][j] += 1;
      if (current < below) counts[i][j] += 1;
      if (current < right) counts[i][j] += 1;

      // if (i === 1 && j === 1) {
      //   continue;
      // }

      // const current = rows[i - 1]?.[j - 1];

      // const above = rows[i - 2]?.[j - 1] ?? 0;
      // if (current < above) {
      //   counts[i][j] += counts[i - 1][j];
      // }

      // const left = rows[i - 1]?.[j - 2] ?? 0;
      // if (current < left) {
      //   counts[i][j] += counts[i][j - 1];
      // }

      // const below = rows[i]?.[j - 1] ?? 0;
      // if (current < below) {
      //   counts[i][j] += counts[i + 1][j];
      // }

      // const right = rows[i - 1]?.[j] ?? 0;
      // if (current < right) {
      //   counts[i][j] += counts[i][j + 1];
      // }
    }
  }

  console.log(counts.join("\n"));
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, m, rows);

  idx += n + offset;
}
