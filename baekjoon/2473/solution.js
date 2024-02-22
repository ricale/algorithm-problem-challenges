function solution([n], nums) {
  nums.sort((a, b) => a - b);

  if (nums[0] >= 0) {
    console.log(`${nums[0]} ${nums[1]} ${nums[2]}`);
    return;
  }

  if (nums[n - 1] <= 0) {
    console.log(`${nums[n - 3]} ${nums[n - 2]} ${nums[n - 1]}`);
    return;
  }

  const lefts = [nums[0]];
  const rights = [nums[n - 1]];
  let sum = nums[0] + nums[n - 1];

  let l = 1;
  let r = n - 2;

  if (sum > 0) {
    lefts.push(nums[l]);
    sum += nums[l];
    l += 1;
  } else {
    lefts.push(nums[r]);
    sum += nums[r];
    r -= 1;
  }

  let min = sum;
  let minVals = [...lefts, ...rights];

  while (l < r) {
    if (sum > 0) {
    } else if (sum < 0) {
    } else {
      console.log(minVals.sort((a, b) => a - b));
      return;
    }
  }
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
