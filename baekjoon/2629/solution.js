function solution([count], weights, [n], cases) {
  let result = "";
  for (const target of cases) {
    if (weights[0] === target) {
      result += "Y ";
      continue;
    }
    let subres = undefined;

    const answers = new Set([0, weights[0]]);

    for (let i = 1; i < count && subres === undefined; i++) {
      const weight = weights[i];
      const subanswers = [];
      for (const item of answers) {
        if (item + weight === target) {
          subres = true;
          break;
        }
        subanswers.push(item + weight);

        if (Math.abs(item - weight) === target) {
          subres = true;
          break;
        }
        subanswers.push(Math.abs(item - weight));
      }

      subanswers.forEach((it) => answers.add(it));
    }

    result += subres ? "Y " : "N ";
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
