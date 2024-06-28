function getPairsSum(arr, rows) {
  let sum = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const ni = arr[i];
      const nj = arr[j];
      sum += rows[ni][nj] + rows[nj][ni];
    }
  }
  return sum;
}

function solution(n, rows) {
  const checked = new Array(n).fill(false);
  const sequence = [];
  let min = Infinity;
  let minSequence = [];
  // let start = 0;

  function getSequences(idx = 0) {
    if (idx === n / 2) {
      const bs = [];
      for (let i = 1; i < n; i++) {
        if (!checked[i]) {
          bs.push(i);
        }
      }
      const start = getPairsSum(sequence, rows);
      const link = getPairsSum(bs, rows);
      const diff = Math.abs(start - link);
      if (min > diff) {
        min = diff;
        minSequence = [...sequence];
      }
      return;
    }

    for (let i = idx === 0 ? 0 : sequence[idx - 1] + 1; i < n; i++) {
      if (!checked[i]) {
        checked[i] = true;
        sequence[idx] = i;
        // let subSum = 0;
        // for (let j = 0; j < idx; j++) {
        //   subSum += rows[sequence[j]][i] + rows[i][sequence[j]];
        // }
        // start += subSum;
        getSequences(idx + 1);
        // start -= subSum;
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
