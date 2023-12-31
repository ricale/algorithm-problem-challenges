function solution(n, k) {
  const queue = [n];
  let qidx = 0;
  const checked = new Map();
  checked.set(n, { duration: 0, last: null });
  while (queue.length > qidx && !checked.get(k)) {
    const pos = queue[qidx++];
    const current = checked.get(pos);

    const cands = pos > k ? [pos - 1] : [pos - 1, pos + 1, 2 * pos];

    for (const cand of cands) {
      if (cand < 0 || cand > 100000) {
        continue;
      }
      const item = checked.get(cand);
      if (item && item.duration <= current.duration + 1) {
        continue;
      }
      queue.push(cand);
      checked.set(cand, { duration: current.duration + 1, last: pos });
    }
  }

  let item = checked.get(k);
  let result = `${item.duration}`;
  let path = `${k}`;

  while (item.last !== null) {
    path = `${item.last} ${path}`;
    item = checked.get(item.last);
  }

  console.log(`${result}\n${path}`);
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
