function solution(n, d, values) {
  let result = 0;
  let lastStart;

  for (let i = 0; i < values.length; i++) {
    const start = values[i][0];

    if (lastStart === start) {
      continue;
    }

    const end = start + d;
    let count = 0;

    for (let j = i; j < values.length; j++) {
      if (values[j][0] >= start && values[j][0] <= end) {
        if (values[j][1] <= end) {
          count += 1;
        }
      } else {
        break;
      }
    }

    if (result < count) {
      result = count;
    }

    lastStart = start;
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
  const d = +cases[idx + n];
  const values = cases
    .slice(idx, idx + n)
    .reduce((acc, item) => {
      const splitted = item
        .trim()
        .split(" ")
        .map((it) => +it)
        .sort((a, b) => a - b);
      if (splitted[1] - splitted[0] > d) {
        return acc;
      }
      return [...acc, splitted];
    }, [])
    .sort((a, b) => a[0] - b[0]);
  idx += n;

  idx += 1;

  solution(n, d, values);
}
