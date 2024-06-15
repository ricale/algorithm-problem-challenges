// DP, 5% 틀렸습니다

const FROM_LEFT = 0;
const FROM_ABOVELEFT = 1;
const FROM_ABOVE = 2;

function solution(n, rows) {
  const dp = [...new Array(n)].map(() => new Array(n).fill(undefined));
  dp[0][1] = [1, 0, 0];

  const getAnswer = (y, x) => {
    if (dp[y][x]) {
      return dp[y][x];
    }
    const answer = [0, 0, 0];

    if (rows[y - 1]?.[x] === "0") {
      const fromAbove = getAnswer(y - 1, x);

      if (rows[y - 2]?.[x] === "0") {
        answer[FROM_ABOVE] += fromAbove[FROM_ABOVE];
        if (rows[y - 1]?.[x - 1] === "0" && rows[y - 2]?.[x - 1] === "0") {
          answer[FROM_ABOVE] += fromAbove[FROM_ABOVELEFT];
        }
      }
    }

    if (rows[y][x - 1] === "0") {
      const fromLeft = getAnswer(y, x - 1);

      if (rows[y][x - 2] === "0") {
        answer[FROM_LEFT] += fromLeft[FROM_LEFT];
        if (rows[y - 1]?.[x - 1] === "0" && rows[y - 1]?.[x - 2] === "0") {
          answer[FROM_LEFT] += fromLeft[FROM_ABOVELEFT];
        }
      }
    }

    if (
      rows[y - 1]?.[x - 1] === "0" &&
      rows[y - 1]?.[x] === "0" &&
      rows[y]?.[x - 1] === "0"
    ) {
      const fromAboveleft = getAnswer(y - 1, x - 1);

      if (rows[y - 1]?.[x - 2] === "0") {
        answer[FROM_ABOVELEFT] += fromAboveleft[FROM_LEFT];
      }
      if (rows[y - 2]?.[x - 1] === "0") {
        answer[FROM_ABOVELEFT] += fromAboveleft[FROM_ABOVE];
      }
      if (
        rows[y - 1]?.[x - 2] === "0" &&
        rows[y - 2]?.[x - 1] === "0" &&
        rows[y - 2]?.[x - 2] === "0"
      ) {
        answer[FROM_ABOVELEFT] += fromAboveleft[FROM_ABOVELEFT];
      }
    }

    dp[y][x] = [...answer];

    return answer;
  };

  getAnswer(n - 1, n - 1);
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
