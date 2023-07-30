function solution([count], weights, [n], cases) {
  const answers = new Set([0]);

  for (const weight of weights) {
    const currentAnswers = [...answers];
    for (const answer of currentAnswers) {
      answers.add(Math.floor(answer - weight));
      answers.add(answer + weight);
    }
  }

  let result = "";
  for (const target of cases) {
    result += answers.has(target) ? "Y " : "N ";
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

const mapper = (item) => {
  return item
    .trim()
    .split(" ")
    .map((it) => +it);
};

if (isLocal) {
  const LINE_COUNT = 4;
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
