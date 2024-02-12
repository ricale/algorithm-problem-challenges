function solution([n], nums) {
  let l = 0;
  let r = n - 1;
  let min = Infinity;
  let minPair = null;

  while (l < r) {
    const sum = nums[l] + nums[r];
    if (min > Math.abs(sum)) {
      min = Math.abs(sum);
      minPair = [nums[l], nums[r]];
      if (min === 0) {
        break;
      }
    }

    if (sum > 0) {
      r -= 1;
    } else {
      l += 1;
    }
  }

  console.log(`${minPair[0]} ${minPair[1]}`);
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
