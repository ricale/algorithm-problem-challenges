const LIMIT = 1000000;
const BASE_MATRIX = [
  [1, 1],
  [1, 0],
];

function multiply(m1, m2) {
  const result = [
    [0, 0],
    [0, 0],
  ];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        result[i][j] = (result[i][j] + m1[i][k] * m2[k][j]) % LIMIT;
      }
    }
  }
  return result;
}

function getAnswer(matrix, n) {
  if (n === 1n) {
    return matrix;
  }

  const halfResult = getAnswer(matrix, n / 2n);
  const subResult = multiply(halfResult, halfResult);
  const result = n % 2n === 1n ? multiply(BASE_MATRIX, subResult) : subResult;
  return result;
}

function solution(n) {
  if (n <= 1n) {
    console.log(`${n}`);
    return;
  }

  const result = getAnswer(BASE_MATRIX, n - 1n);
  console.log(result[0][0]);
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
    solution(BigInt(item));
  });
} else {
  solution(BigInt(input));
}
