function getAnswer(n, rows) {
  rows.sort((a, b) => a[0] - b[0]);

  let count = 1;

  let top = rows[0][1];
  for (let i = 1; i < n; i++) {
    if (top > rows[i][1]) {
      count += 1;
      top = rows[i][1];
    }
  }

  return count;
}

function solution(t, cases) {
  let result = "";
  for (const [n, rows] of cases) {
    result += `${getAnswer(n, rows)}\n`;
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

const lines = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < lines.length) {
  const t = +lines[idx++];
  const cases = [];
  for (let i = 0; i < t; i++) {
    const n = +lines[idx++];
    const rows = lines.slice(idx, idx + n).map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
    idx += n;
    cases.push([n, rows]);
  }

  solution(t, cases);
}
