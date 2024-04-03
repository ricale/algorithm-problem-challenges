function getBitString(digit, n) {
  const bits = n.toString(2);
  return `${"0".repeat(digit - bits.length)}${bits}`;
}

function solution(n, rows) {
  let last = [...new Array(n)];
  const answers = [...new Array(n)];
  for (let i = 0; i < n; i++) {
    answers[i] = { checked: Math.pow(2, i), sum: rows[0][i] };
  }

  for (let i = 1; i < n; i++) {
    last = [...answers];
    for (let j = 0; j < n; j++) {
      let min = Infinity;
      let minChecked = null;
      for (let k = 0; k < n; k++) {
        const { checked, sum } = last[k];

        if ((checked & Math.pow(2, j)) === 0) {
          if (min > sum) {
            min = sum;
            minChecked = checked;
          }
        }
      }
      answers[j] = {
        checked: minChecked | Math.pow(2, j),
        sum: rows[i][j] + min,
      };
      console.log(answers[j]);
    }
  }

  console.log(Math.min(...answers.map((item) => item.sum)));
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
