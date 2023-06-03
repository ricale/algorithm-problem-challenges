function solution(n, rows) {
  let result = [];
  for (let [n, m] of rows) {
    let count = 1;
    const [min, max] = m - n < n ? [m - n, n] : [n, m - n];
    for (let i = max + 1; i <= m; i++) {
      count *= i;
    }
    for (let i = 2; i <= min; i++) {
      count /= i;
    }
    result.push(count);
  }

  console.log(result.join("\n"));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((it) => {
    return it
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, rows);

  idx += n + offset;
}
