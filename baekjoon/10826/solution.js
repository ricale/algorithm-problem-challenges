const BASE_MATRIX = [
  [1n, 1n],
  [1n, 0n],
];

function multiply(m1, m2) {
  const result = [
    [0n, 0n],
    [0n, 0n],
  ];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        result[i][j] += m1[i][k] * m2[k][j];
      }
    }
  }
  return result;
}

function getAnswer(matrix, n) {
  if (n === 1) {
    return matrix;
  }

  const halfResult = getAnswer(matrix, Math.floor(n / 2));
  const subResult = multiply(halfResult, halfResult);
  const result = n % 2 === 1 ? multiply(subResult, BASE_MATRIX) : subResult;
  return result;
}

function solution(n) {
  if (n <= 1) {
    console.log(n);
    return;
  }

  const result = getAnswer(BASE_MATRIX, n - 1);
  console.log(`${result[0][0]}`);
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
    solution(+item);
  });
} else {
  solution(+input);
}
