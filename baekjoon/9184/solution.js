const results = new Map();

function getResult(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) {
    return 1;
  }

  if (a > 20 || b > 20 || c > 20) {
    return getResult(20, 20, 20);
  }

  const key = `${a}-${b}-${c}`;
  const cached = results.get(key);
  if (cached !== undefined) {
    return cached;
  }

  if (a < b && b < c) {
    const result =
      getResult(a, b, c - 1) +
      getResult(a, b - 1, c - 1) -
      getResult(a, b - 1, c);
    results.set(key, result);
    return result;
  }

  const result =
    getResult(a - 1, b, c) +
    getResult(a - 1, b - 1, c) +
    getResult(a - 1, b, c - 1) -
    getResult(a - 1, b - 1, c - 1);
  results.set(key, result);
  return result;
}

function solution(rows) {
  let result = "";
  for (let [a, b, c] of rows) {
    if (a === -1 && b === -1 && c === -1) {
      break;
    }

    result += `w(${a}, ${b}, ${c}) = ${getResult(a, b, c)}\n`;
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

const cases = input
  .split("\n")
  .filter((item) => !!item)
  .map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
solution(cases);
