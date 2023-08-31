function solution(n, k) {
  const queue = [{ idx: n, count: 1 }];
  const checked = new Array(100001).fill(0);
  checked[n] = 1;

  while (checked[k] === 0) {
    const { idx, count } = queue.shift();

    const nexts = [idx - 1, idx + 1, idx * 2];

    for (const next of nexts) {
      if (next >= 0 && next <= 100000 && checked[next] === 0 && next !== idx) {
        checked[next] = count + 1;
        queue.push({ idx: next, count: count + 1 });
      }
    }
  }

  console.log(checked[k] - 1);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(
      ...item
        .trim()
        .split(" ")
        .map((it) => +it)
    );
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
