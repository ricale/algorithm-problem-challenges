function solution(n, rows) {
  const counter = new Map();
  const result = new Map();
  for (const name of rows) {
    const key = name[0];
    if (result.has(key)) {
      continue;
    }
    const count = (counter.get(key) || 0) + 1;
    if (count >= 5) {
      result.set(key, 1);
    }
    counter.set(key, count);
  }
  const resultArray = Array.from(result.keys());
  if (resultArray.length === 0) {
    console.log("PREDAJA");
    return;
  }
  console.log(resultArray.sort().join(""));
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
    return item.trim();
  });
  idx += n;

  solution(n, rows);
}
