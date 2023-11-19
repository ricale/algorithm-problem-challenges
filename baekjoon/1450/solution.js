function getCombinations(values, idx, subResult, result) {
  if (values.length === idx) {
    result.push(subResult);
    return;
  }
  const item = values[idx];

  getCombinations(values, idx + 1, subResult, result);
  getCombinations(values, idx + 1, subResult + item, result);
}

function solution([n, c], weights) {
  const weightsA = weights.slice(0, Math.ceil(n / 2));
  const weightsB = weights.slice(Math.ceil(n / 2));

  const combA = [];
  getCombinations(weightsA, 0, 0, combA);
  combA.sort((a, b) => a - b);

  const combB = [];
  getCombinations(weightsB, 0, 0, combB);

  let result = 0;

  for (const itemB of combB) {
    if (itemB > c) {
      continue;
    }

    let l = 0;
    let r = combA.length;
    while (l < r) {
      let mid = Math.floor((l + r) / 2);

      if (itemB + combA[mid] > c) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    result += r;
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
