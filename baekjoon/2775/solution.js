function solution(t, rows) {
  for (let i = 0; i < t; i++) {
    const [floor, num] = [rows[i * 2], rows[i * 2 + 1]];

    let prev = [...new Array(num + 1)].map((_, i) => i);
    let current = [0];

    for (let j = 1; j <= floor; j++) {
      for (let k = 1; k <= num; k++) {
        current[k] = prev[k] + current[k - 1];
      }
      prev = current;
      current = [0];
    }

    console.log(prev[num]);
  }
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
  const rows = cases.slice(idx + offset, idx + n * 2 + offset).map((item) => {
    return +item;
  });
  solution(n, rows);

  idx += n * 2 + offset;
}
