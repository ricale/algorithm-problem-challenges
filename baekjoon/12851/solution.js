function solution(n, k) {
  if (n === k) {
    console.log(`0\n1`);
    return;
  }
  const queue = [{ value: n, weight: 0 }];
  const checked = new Array(100_001).fill(false);

  let qidx = 0;
  let min = null;
  let count = 0;
  while (queue.length > qidx) {
    const item = queue[qidx++];
    checked[item.value] = true;

    if (item.value === k) {
      min = item.weight;
      count += 1;
      continue;
    }

    if (min !== null && min < item.weight) {
      break;
    }

    const cands = [item.value - 1, item.value + 1, item.value * 2];

    for (const cand of cands) {
      if (item.value < 0 || item.value > 100000) {
        continue;
      }
      if (checked[cand]) {
        continue;
      }
      queue.push({ value: cand, weight: item.weight + 1 });
    }
  }

  console.log(`${min}\n${count}`);
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
