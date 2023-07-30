function solution(n, rows) {
  const result = new Array(n).fill(n);

  for (let i = 0; i < n; i++) {
    const stat1 = rows[i];
    for (let j = i + 1; j < n; j++) {
      const stat2 = rows[j];
      if (stat1[0] > stat2[0] && stat1[1] > stat2[1]) {
        result[i] -= 1;
      } else if (stat1[0] < stat2[0] && stat1[1] < stat2[1]) {
        result[j] -= 1;
      } else {
        result[i] -= 1;
        result[j] -= 1;
      }
    }
  }

  console.log(result.join(" "));
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
