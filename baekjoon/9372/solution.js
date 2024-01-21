function solution(t, data) {
  let result = "";
  for (const [n, m, rows] of data) {
    result += `${n - 1}\n`;
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
  const data = [];
  for (let i = 0; i < t; i++) {
    const [n, m] = cases[idx++].split(" ").map((it) => +it);
    const rows = cases.slice(idx, idx + m).map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
    data.push([n, m, rows]);
    idx += m;
  }

  solution(t, data);
}
