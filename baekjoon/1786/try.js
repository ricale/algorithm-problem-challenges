function solution(target, p) {
  let lastCands = [];
  const result = [];
  for (let i = 0; i < target.length; i++) {
    const newCands = [];
    if (target[i] === p[0]) {
      newCands.push(1);
    }
    for (const cand of lastCands) {
      if (target[i] === p[cand]) {
        if (cand === p.length - 1) {
          result.push(i - cand + 1);
        } else {
          newCands.push(cand + 1);
        }
      }
    }
    lastCands = [...newCands];
  }

  console.log(`${result.length}\n${result.join(" ")}`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item) => {
  return item;
};

if (isLocal) {
  const LINE_COUNT = 2;
  const rows = input
    .split("\n")
    .filter((item) => !!item)
    .reduce((acc, item, i) => {
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(mapper(item));

      return acc;
    }, []);

  rows.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
