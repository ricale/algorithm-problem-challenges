function solution([n], nums, [x]) {
  nums.sort((a, b) => a - b);

  let l = 0;
  let r = n - 1;
  let count = 0;

  while (l !== r) {
    if (nums[l] + nums[r] > x) {
      r--;
    } else if (nums[l] + nums[r] < x) {
      l++;
    } else {
      count += 1;
      l++;
    }
  }

  console.log(count);
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
  const LINE_COUNT = 3;
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
