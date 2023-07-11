const MODER = 1000;

function multiply(n, mat1, mat2) {
  const answer = [...new Array(n)].map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      //
      for (let k = 0; k < n; k++) {
        answer[i][j] += (mat1[i][k] * mat2[k][j]) % MODER;
        answer[i][j] = answer[i][j] % MODER;
      }
    }
  }
  return answer;
}

function dnq(n, b, mat) {
  if (b === 1n) {
    return mat;
  }

  const moded = b % 2n;
  const half = b / 2n;

  const squared = dnq(n, half, mat);

  const subResult = moded ? multiply(n, mat, squared) : squared;
  return multiply(n, subResult, squared);
}

function solution(n, b, mat) {
  const source = mat.map((row) => row.map((item) => item % 1000));

  console.log(
    dnq(n, b, source)
      .map((it) => it.join(" "))
      .join("\n")
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
  const firstline = cases[idx].split(" ");
  const n = +firstline[0];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, BigInt(firstline[1]), rows);

  idx += n + offset;
}
