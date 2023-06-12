function solution([n], nums) {
  const counts = [1];

  let max = 1;
  for (let i = 1; i < n; i++) {
    let subMax = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] < nums[i]) {
        subMax = Math.max(subMax, counts[j]);
      }
    }
    counts[i] = subMax + 1;
    max = Math.max(max, counts[i]);
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
