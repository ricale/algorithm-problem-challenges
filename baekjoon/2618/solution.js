function getDirection([y1, x1], [y2, x2]) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function getAnswer(dp, n, w, cases, p1, p2) {
  const nextCaseIndex = Math.max(p1, p2) + 1;
  if (nextCaseIndex > w) {
    return 0;
  }
  if (dp[p1][p2] !== -1) {
    return dp[p1][p2];
  }
  const nextCase = cases[nextCaseIndex];

  const d1 =
    p1 === 0
      ? getDirection([1, 1], nextCase)
      : getDirection(cases[p1], nextCase);

  const d2 =
    p2 === 0
      ? getDirection([n, n], nextCase)
      : getDirection(cases[p2], nextCase);

  const result1 = d1 + getAnswer(dp, n, w, cases, nextCaseIndex, p2);
  const result2 = d2 + getAnswer(dp, n, w, cases, p1, nextCaseIndex);
  dp[p1][p2] = Math.min(result1, result2);
  return dp[p1][p2];
}

function getOrdered(dp, n, w, cases, ordered, p1, p2) {
  const nextCaseIndex = Math.max(p1, p2) + 1;
  if (nextCaseIndex > w) {
    return;
  }
  const nextCase = cases[nextCaseIndex];

  const d1 =
    p1 === 0
      ? getDirection([1, 1], nextCase)
      : getDirection(cases[p1], nextCase);

  const d2 =
    p2 === 0
      ? getDirection([n, n], nextCase)
      : getDirection(cases[p2], nextCase);

  if (d1 + dp[nextCaseIndex][p2] < d2 + dp[p1][nextCaseIndex]) {
    ordered.push(1);
    getOrdered(dp, n, w, cases, ordered, nextCaseIndex, p2);
  } else {
    ordered.push(2);
    getOrdered(dp, n, w, cases, ordered, p1, nextCaseIndex);
  }
}

function solution(n, w, rows) {
  const dp = [...new Array(1001)].map(() => new Array(1001).fill(-1));

  const answer = getAnswer(dp, n, w, rows, 0, 0);
  const ordered = [];
  getOrdered(dp, n, w, rows, ordered, 0, 0);

  console.log(`${answer}\n${ordered.join("\n")}`);
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
  const w = +cases[idx++];
  const rows = cases.slice(idx, idx + w).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += w;

  solution(n, w, [undefined, ...rows]);
}
