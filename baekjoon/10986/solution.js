function solution([n, m], nums) {
  const subSums = [nums[0]];
  for (let i = 1; i < n; i++) {
    subSums[i] = subSums[i - 1] + nums[i];
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    const subs = subSums[i - 1] ?? 0;
    for (let j = i; j < n; j++) {
      const subSum = subSums[j] - subs;
      if (subSum % m === 0) {
        result += 1;
      }
    }
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
