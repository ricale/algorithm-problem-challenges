function solution(n, rows) {
  if (n === 1) {
    console.log(rows[0]);
    return;
  }
  let result = "";
  for (let i = 0; i < rows[0].length; i++) {
    for (let j = 1; j < n; j++) {
      if (rows[0][i] !== rows[j][i]) {
        result += "?";
        break;
      }
      if (j === n - 1) {
        result += rows[0][i];
      }
    }
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
    return item;
  });
  idx += n;

  solution(n, rows);
}
