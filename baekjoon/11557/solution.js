function solution(t, values) {
  let result = "";
  for (const [n, rows] of values) {
    let max = 0;
    let maxName = "";
    for (const [s, l] of rows) {
      if (max < +l) {
        max = +l;
        maxName = s;
      }
    }
    result += `${maxName}\n`;
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
  const values = [];
  for (let i = 0; i < t; i++) {
    const n = +cases[idx++];
    const rows = cases.slice(idx, idx + n).map((item) => {
      return item.trim().split(" ");
    });
    values.push([n, rows]);
    idx += n;
  }

  solution(t, values);
}
