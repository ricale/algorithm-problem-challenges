function solution(...heights) {
  heights.sort((a, b) => a - b);
  const target = heights.reduce((acc, item) => acc + item, 0) - 100;

  let l = 0;
  let r = 8;

  while (l < r) {
    const sum = heights[l] + heights[r];
    if (sum < target) {
      l += 1;
    } else if (sum > target) {
      r -= 1;
    } else {
      break;
    }
  }

  console.log(heights.filter((_, idx) => idx !== l && idx !== r).join("\n"));
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
  const LINE_COUNT = 9;
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
