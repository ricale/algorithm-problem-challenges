function solution(n, rows) {
  const checked = new Array(n).fill(false);
  let min = Infinity;

  function getSequences(idx = 0, from = 0) {
    if (idx === n / 2) {
      let start = 0;
      let link = 0;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          if (checked[i] && checked[j]) start += rows[i][j] + rows[j][i];
          if (!checked[i] && !checked[j]) link += rows[i][j] + rows[j][i];
        }
      }
      const diff = Math.abs(start - link);
      if (min > diff) {
        min = diff;
      }
      return;
    }

    for (let i = from; i < n; i++) {
      if (!checked[i]) {
        checked[i] = true;
        getSequences(idx + 1, i + 1);
        checked[i] = false;
      }
    }
  }

  getSequences();

  console.log(min);
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
