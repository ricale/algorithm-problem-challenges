function solution(n, k) {
  let left = 1;
  let right = n * n;
  let answer = Infinity;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    let count = 0;
    const range = Math.min(n, mid);
    for (let i = 1; i <= range; i++) {
      const maxOfLine = Math.min(i * n, mid);
      count += Math.floor(maxOfLine / i);
    }

    if (count < k) {
      left = mid + 1;
    } else {
      right = mid - 1;
      answer = Math.min(answer, mid);
    }
  }

  console.log(answer);
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
