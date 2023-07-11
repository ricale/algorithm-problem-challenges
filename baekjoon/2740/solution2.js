function solution(n, m, k, mat1, mat2) {
  function dnq(i, j, start, end) {
    if (start === end) {
      return mat1[i][start] * mat2[start][j];
    }

    const mid = Math.floor((start + end) / 2);
    return dnq(i, j, start, mid) + dnq(i, j, mid + 1, end);
  }

  const answer = [...new Array(n)].map(() => new Array(k).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < k; j++) {
      answer[i][j] = dnq(i, j, 0, m - 1);
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
