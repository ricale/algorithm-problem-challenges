function solution([n, m], memories, costs) {
  const availableCosts = costs.reduce((acc, it) => acc + it, 0);
  const result = [...new Array(availableCosts + 1)].map(() =>
    new Array(n + 1).fill(0)
  );

  for (let i = 0; i <= availableCosts; i++) {
    for (let j = 1; j <= n; j++) {
      const memory = memories[j - 1];
      const cost = costs[j - 1];
      result[i][j] = Math.max(
        result[i][j - 1],
        i > 0 ? result[i - 1][j] : 0,
        i >= cost ? result[i - cost][j - 1] + memory : 0
      );

      if (result[i][j] >= m) {
        console.log(i);
        return;
      }
    }
  }
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item) => {
  return item
    .trim()
    .split(" ")
    .map((it) => +it);
};

if (isLocal) {
  const LINE_COUNT = 3;
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
