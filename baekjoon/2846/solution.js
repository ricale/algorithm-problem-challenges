function solution([n], heights) {
  let asc = false;
  let begin;
  let result = 0;
  for (let i = 1; i < n; i++) {
    if (!asc && heights[i] > heights[i - 1]) {
      asc = true;
      begin = heights[i - 1];
    } else if (asc && heights[i] <= heights[i - 1]) {
      asc = false;
      result = Math.max(result, heights[i - 1] - begin);
    }
  }

  if (asc) {
    result = Math.max(result, heights[n - 1] - begin);
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
