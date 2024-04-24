function solution(m, n) {
  let min = -1;
  let sum = 0;
  for (let i = m; i <= n; i++) {
    const sqrted = Math.sqrt(i);
    if (sqrted === Math.floor(sqrted)) {
      if (min === -1) {
        min = i;
      }
      sum += i;
    }
  }

  if (min === -1) {
    console.log(-1);
    return;
  }
  console.log(`${sum}\n${min}`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item) => {
  return +item;
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
