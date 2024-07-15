function solution([n], candies) {
  let l = 0;
  let r = 0;
  let count = 0;
  const checked = new Map();

  let max = 0;
  while (l <= r && r < n) {
    const hasRightCandy = checked.has(candies[r]);
    if (checked.size < 2 || (checked.size === 2 && hasRightCandy)) {
      if (hasRightCandy) {
        checked.set(candies[r], checked.get(candies[r]) + 1);
      } else {
        checked.set(candies[r], 1);
      }
      r += 1;
      count += 1;
      if (max < count) {
        max = count;
      }
    } else {
      const lastValue = checked.get(candies[l]);
      if (lastValue === 1) {
        checked.delete(candies[l]);
      } else {
        checked.set(candies[l], lastValue - 1);
      }
      l += 1;
      count -= 1;
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
