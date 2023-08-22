function solution(t, rows) {
  const answers = [0, 1, 2, 4, 7, 13];
  let result = "";
  for (const n of rows) {
    if (answers[n]) {
      result += `${answers[n]}\n`;
      continue;
    }

    for (let i = answers.length; i <= n; i++) {
      answers[i] = answers[i - 3] + answers[i - 2] + answers[i - 1];
    }
    result += `${answers[n]}\n`;
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
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return +item;
  });
  solution(n, rows);

  idx += n + offset;
}
