function solution(k, data) {
  let result = "";
  for (const { n, rows } of data) {
    const wears = {};
    for (const [wear, pos] of rows) {
      if (!wears[pos]) {
        wears[pos] = 1;
      }
      wears[pos] += 1;
    }

    result += `${
      Object.values(wears).reduce((acc, count) => acc * count, 1) - 1
    }\n`;
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
  const k = +cases[idx++];
  const data = [];

  for (let i = 0; i < k; i++) {
    const n = +cases[idx++];
    const rows = cases.slice(idx, idx + n).map((item) => {
      return item.trim().split(" ");
    });
    idx += n;
    data.push({ n, rows });
  }

  solution(k, data);
}
