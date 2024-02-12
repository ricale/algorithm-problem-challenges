// dynamic programming
function solution(n, nums, m, rows) {
  const answers = [...new Array(n)].map(() => new Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    answers[i][i] = true;
    if (nums[i] === nums[i + 1]) {
      answers[i][i + 1] = true;
    }
  }

  for (let i = n - 3; i >= 0; i--) {
    for (let j = i + 2; j < n; j++) {
      if (nums[i] === nums[j] && answers[i + 1][j - 1]) {
        answers[i][j] = true;
      }
    }
  }

  let result = "";
  for (let [s, e] of rows) {
    result += `${answers[s - 1][e - 1] ? 1 : 0}\n`;
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
  const n = +cases[idx++];
  const nums = cases[idx++].split(" ").map((it) => +it);
  const m = +cases[idx++];
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, nums, m, rows);
}
