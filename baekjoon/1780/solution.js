function dnq(rows, x1, y1, x2, y2) {
  if (x1 === x2 && y1 === y2) {
    return rows[y1][x1];
  }

  const step = (x2 - x1 + 1) / 3;
  const result = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const subRes = dnq(
        rows,
        x1 + j * step,
        y1 + i * step,
        x1 + (j + 1) * step - 1,
        y1 + (i + 1) * step - 1
      );
      if (typeof subRes === "number") {
        result[subRes + 1] += 1;
      } else {
        for (let k = 0; k < 3; k++) {
          result[k] += subRes[k];
        }
      }
    }
  }

  if (result[0] === 0 && result[1] === 0) {
    return 1;
  }
  if (result[1] === 0 && result[2] === 0) {
    return -1;
  }
  if (result[0] === 0 && result[2] === 0) {
    return 0;
  }

  return result;
}

function solution(n, rows) {
  const result = dnq(rows, 0, 0, n - 1, n - 1);
  if (typeof result === "number") {
    const arr = [0, 0, 0];
    arr[result + 1] = 1;
    console.log(arr.join("\n"));
    return;
  }
  console.log(result.join("\n"));
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
