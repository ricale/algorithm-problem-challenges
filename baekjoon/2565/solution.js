function solution(n, rows) {
  const sorted = rows.sort((a, b) => a[0] - b[0]).map((it) => it[1]);
  const counts = [1];

  let max = 1;
  for (let i = 1; i < sorted.length; i++) {
    counts[i] = 1;
    for (let j = 0; j < i; j++) {
      if (sorted[j] < sorted[i] && counts[j] + 1 > counts[i]) {
        counts[i] = counts[j] + 1;
      }
    }
    if (max < counts[i]) {
      max = counts[i];
    }
  }

  console.log(n - max);
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
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, rows);

  idx += n + offset;
}
