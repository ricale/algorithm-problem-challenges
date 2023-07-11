const MODER = 1000000007n;

function multiply(mat1, mat2) {
  const answer = [...new Array(2)].map(() => new Array(2).fill(0n));
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        answer[i][j] += (mat1[i][k] * mat2[k][j]) % MODER;
        answer[i][j] = answer[i][j] % MODER;
      }
    }
  }

  return answer;
}

function dnq(n, mat) {
  if (n === 1n) {
    return mat;
  }

  const squared = dnq(n / 2n, mat);
  const subResult = n % 2n === 1n ? multiply(mat, squared) : squared;
  return multiply(subResult, squared);
}

const BASE_MATRIX = [
  [1n, 1n],
  [1n, 0n],
];

function solution(n) {
  console.log(dnq(n, BASE_MATRIX)[0][1].toString());
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(BigInt(item.trim()));
  });
} else {
  solution(BigInt(input.trim()));
}
