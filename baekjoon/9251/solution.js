function solution(w1, w2) {
  const counts = [...new Array(w1.length + 1)].map(() => [
    ...new Array(w2.length + 1).fill(0),
  ]);

  for (let i = 1; i <= w1.length; i++) {
    for (let j = 1; j <= w2.length; j++) {
      if (w1[i - 1] === w2[j - 1]) {
        counts[i][j] = counts[i - 1][j - 1] + 1;
      } else {
        counts[i][j] = Math.max(counts[i - 1][j], counts[i][j - 1]);
      }
    }
  }

  console.log(counts[w1.length][w2.length]);
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
  const cases = input
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

  cases.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
