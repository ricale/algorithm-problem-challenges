function getAnswer(num) {
  for (let i = 1; i < num; i++) {
    const ti = (i * (i + 1)) / 2;
    if (ti >= num) {
      break;
    }
    for (let j = i; j < num; j++) {
      const tj = (j * (j + 1)) / 2;
      if (ti + tj >= num) {
        break;
      }
      for (let k = j; k < num; k++) {
        const tk = (k * (k + 1)) / 2;
        const sum = ti + tj + tk;
        if (sum === num) {
          return 1;
        } else if (sum > num) {
          break;
        }
      }
    }
  }

  return 0;
}

function solution(n, rows) {
  let result = "";

  for (const num of rows) {
    result += `${getAnswer(num)}\n`;
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
    return +item;
  });
  idx += n;

  solution(n, rows);
}
