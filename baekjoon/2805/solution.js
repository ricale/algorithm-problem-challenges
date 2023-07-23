function solution([n, m], trees) {
  let left = 0;
  let right = Math.max(...trees);
  let max = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    const sum = trees.reduce(
      (acc, item) => acc + (item > mid ? item - mid : 0),
      0
    );
    if (sum >= m) {
      max = Math.max(max, mid);
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  console.log(max);
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
