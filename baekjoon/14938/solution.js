function solution(n, m, r, items, routes) {
  const answer = [...new Array(n + 1)].map(() =>
    new Array(n + 1).fill(Infinity)
  );
  for (let i = 1; i <= n; i++) {
    answer[i][i] = 0;
  }

  for (const [a, b, l] of routes) {
    answer[a][b] = l;
    answer[b][a] = l;
  }

  for (let mid = 1; mid <= n; mid++) {
    for (let start = 1; start <= n; start++) {
      for (let end = 1; end <= n; end++) {
        if (answer[start][end] > answer[start][mid] + answer[mid][end]) {
          answer[start][end] = answer[start][mid] + answer[mid][end];
        }
      }
    }
  }

  console.log(
    Math.max(
      ...answer.map((row, i) => {
        if (i === 0) {
          return 0;
        }
        return row.reduce((acc, length, idx) => {
          if (idx > 0 && length <= m) {
            acc += items[idx - 1];
          }
          return acc;
        }, 0);
      })
    )
  );
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
  const [n, m, r] = cases[idx++].split(" ").map((it) => +it);
  const items = cases[idx++].split(" ").map((it) => +it);
  const routes = cases.slice(idx, idx + r).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += r;

  solution(n, m, r, items, routes);
}
