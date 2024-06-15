const FROM_LEFT = 0;
const FROM_ABOVELEFT = 1;
const FROM_ABOVE = 2;

function solution(n, rows) {
  const dp = [...new Array(n)].map(() =>
    [...new Array(n)].map(() => [0, 0, 0])
  );
  dp[0][1][FROM_LEFT] = 1;
  for (let i = 2; i < n; i++) {
    if (rows[0][i] === "0") {
      dp[0][i][FROM_LEFT] = dp[0][i - 1][FROM_LEFT];
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (rows[i][j] !== "0") {
        continue;
      }

      if (
        rows[i - 1][j] === "0" &&
        rows[i][j - 1] === "0" &&
        rows[i - 1][j - 1] === "0"
      ) {
        dp[i][j][FROM_ABOVELEFT] =
          dp[i - 1][j - 1][FROM_ABOVE] +
          dp[i - 1][j - 1][FROM_ABOVELEFT] +
          dp[i - 1][j - 1][FROM_LEFT];
      }

      if (rows[i - 1][j] === "0") {
        dp[i][j][FROM_ABOVE] =
          dp[i - 1][j][FROM_ABOVE] + dp[i - 1][j][FROM_ABOVELEFT];
      }

      if (rows[i][j - 1] === "0") {
        dp[i][j][FROM_LEFT] =
          dp[i][j - 1][FROM_LEFT] + dp[i][j - 1][FROM_ABOVELEFT];
      }
    }
  }

  const result = dp[n - 1][n - 1];
  console.log(result ? result.reduce((acc, item) => acc + item, 0) : 0);
  // console.log(
  //   dp
  //     .map((row) =>
  //       row.map((item) => (item ? item[0] + item[1] + item[2] : 0)).join(" ")
  //     )
  //     .join("\n")
  // );
  // console.log(
  //   dp
  //     .map((row) =>
  //       row.map((item) => (item ? item.join(",") : "0,0,0")).join(" ")
  //     )
  //     .join("\n")
  // );
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
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item.trim().split(" ");
  });
  idx += n;

  solution(n, rows);
}
