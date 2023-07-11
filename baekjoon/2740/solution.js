function solution(n, m, k, mat1, mat2) {
  const answer = [...new Array(n)].map(() => new Array(k).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < k; j++) {
      for (let l = 0; l < m; l++) {
        answer[i][j] += mat1[i][l] * mat2[l][j];
      }
    }
  }

  console.log(answer.map((it) => it.join(" ")).join("\n"));
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
  const mat1 = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });

  idx += n + offset;
  const [_, k] = cases[idx].split(" ").map((it) => +it);
  const mat2 = cases.slice(idx + offset, idx + m + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });

  solution(n, m, k, mat1, mat2);

  idx += m + offset;
}
