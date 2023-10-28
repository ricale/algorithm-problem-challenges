function getGcd(n1, n2) {
  let [a, b] = n1 >= n2 ? [n1, n2] : [n2, n1];

  while (true) {
    const r = a % b;
    if (r === 0) {
      return b;
    }
    a = b;
    b = r;
  }
}

function getAnswer(M, N, x, y) {
  let y2 = x % N;
  if (y2 === 0) {
    y2 = N;
  }
  let answer = x;
  const limit = (M * N) / getGcd(M, N);

  while (true) {
    if (y2 === y) {
      return answer;
    }
    if (answer > limit) {
      return -1;
    }
    y2 = (y2 + M) % N;
    if (y2 === 0) {
      y2 = N;
    }
    answer += M;
  }
}

function solution(n, rows) {
  let result = "";
  for (const row of rows) {
    result += `${getAnswer(...row)}\n`;
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
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
