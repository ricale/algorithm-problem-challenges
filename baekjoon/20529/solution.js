function getAnswer(n, items) {
  const counts = new Map();
  for (let item of items) {
    const count = (counts.get(item) ?? 0) + 1;
    if (count >= 3) {
      return 0;
    }
    counts.set(item, count);
  }

  let min = Infinity;
  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      for (let k = j + 1; k < n; k++) {
        let sum = 0;
        for (let l = 0; l < 4; l++) {
          sum +=
            (items[i][l] !== items[j][l]) +
            (items[j][l] !== items[k][l]) +
            (items[k][l] !== items[i][l]);
        }
        min = Math.min(min, sum);
      }
    }
  }

  return min;
}

function solution(t, rows) {
  let result = "";
  for (const [n, items] of rows) {
    result += `${getAnswer(n, items)}\n`;
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
  const t = +cases[idx++];
  const rows = [];
  for (let i = 0; i < t; i++) {
    const n = +cases[idx++];
    const items = cases[idx++].split(" ");
    rows.push([n, items]);
  }

  solution(t, rows);
}
