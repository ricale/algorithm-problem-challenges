function solution(n, dots) {
  const a = dots[0];
  let sum = 0;
  for (let i = 1; i < n - 1; i++) {
    const b = dots[i];
    const c = dots[i + 1];

    const ab = [b[0] - a[0], b[1] - a[1]];
    const ac = [c[0] - a[0], c[1] - a[1]];

    sum += (ab[0] * ac[1] - ab[1] * ac[0]) / 2;
  }

  console.log(Math.abs(sum).toFixed(1));
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
