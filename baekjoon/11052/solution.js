function solution([n], packs) {
  const answers = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    answers[i] = packs[i - 1];
    for (let j = 1; j < i; j++) {
      answers[i] = Math.max(answers[i], answers[j] + packs[i - j - 1]);
    }
  }

  console.log(answers[n]);
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
