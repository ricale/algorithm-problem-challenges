function solution([n], nums) {
  nums.sort((a, b) => a - b);
  let l = 0;
  let r = n - 1;
  let absMin = Math.abs(nums[l] + nums[r]);
  let result = [nums[l], nums[r]];

  while (l !== r) {
    const sum = nums[l] + nums[r];
    const absSum = Math.abs(sum);
    if (absSum === 0) {
      console.log(`${nums[l]} ${nums[r]}`);
      return;
    }
    if (absSum >= absMin) {
      if (sum > 0) {
        r--;
      } else {
        l++;
      }
    } else {
      absMin = absSum;
      result = [nums[l], nums[r]];
      if (sum > 0) {
        r--;
      } else {
        l++;
      }
    }
  }

  console.log(result.join(" "));
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
