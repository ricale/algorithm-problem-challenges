function getLinearAnswer(n, k) {
  if (k > n / 2) {
    return 0;
  }
  if (k === n / 2) {
    return 2;
  }
  if (k === 1) {
    return n;
  }

  return getLinearAnswer(n - 1, k) + getLinearAnswer(n - 2, k - 1);
}

function getAnswer(n, k) {
  if (k > n / 2) {
    return 0;
  }
  if (k === n / 2) {
    return 2;
  }
  if (k === 1) {
    return n;
  }
  return getLinearAnswer(n - 1, k) + getLinearAnswer(n - 3, k - 1);
}

function solution(n, k) {
  console.log(getAnswer(n, k));
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
