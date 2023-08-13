function fibonacci(n, counts, cached) {
  if (n === 0) {
    counts[0] += 1;
    return;
  } else if (n === 1) {
    counts[1] += 1;
    return;
  } else if (cached.has(n)) {
    const item = cached
      .get(n)
      .split(",")
      .map((it) => +it);
    counts[0] += item[0];
    counts[1] += item[1];
    return;
  } else {
    fibonacci(n - 1, counts, cached) + fibonacci(n - 2, counts, cached);
    cached.set(n, counts.join(","));
    return;
  }
}

function solution(n, rows) {
  let result = "";
  const cached = new Map();
  for (let num of rows) {
    const counts = [0, 0];
    fibonacci(num, counts, cached);
    result += `${counts.join(" ")}\n`;
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
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return +item;
  });
  solution(n, rows);

  idx += n + offset;
}
