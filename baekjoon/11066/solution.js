function solution(n, rows) {
  let result = "";
  for (let i = 0; i < rows.length; i += 2) {
    const [k, files] = [rows[i][0], rows[i + 1]];
    const sums = [0];
    for (let i = 1; i <= files.length; i++) {
      sums[i] = sums[i - 1] + files[i - 1];
    }

    const answers = [...new Array(k + 1)].map(() => new Array(k + 1).fill(0));

    for (let l = 1; l < k; l++) {
      for (let start = 1; start <= k - l; start++) {
        let end = start + l;
        answers[start][end] = Infinity;

        for (let mid = start; mid < end; mid++) {
          answers[start][end] = Math.min(
            answers[start][end],
            answers[start][mid] +
              answers[mid + 1][end] +
              (sums[end] - sums[start - 1])
          );
        }
      }
    }
    result += `${answers[1][k]}\n`;
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
  const rows = cases.slice(idx + offset, idx + n * 2 + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, rows);

  idx += n * 2 + offset;
}
