function bs(results, num) {
  let left = 0;
  let right = results.length;
  let mid;

  while (left < right) {
    mid = Math.floor((left + right) / 2);

    if (num > results[mid]) {
      left = mid + 1;
    } else if (num < results[mid]) {
      right = mid;
    } else {
      return;
    }
  }

  if (results[left] < num) {
    results[left + 1] = num;
  } else {
    results[left] = num;
  }
}

function solution([n], nums) {
  const results = [nums[0]];

  for (let i = 1; i < n; i++) {
    if (results[results.length - 1] < nums[i]) {
      results.push(nums[i]);
    } else if (results[0] > nums[i]) {
      results[0] = nums[i];
    } else {
      bs(results, nums[i]);
    }
  }

  console.log(results);
  console.log(results.length);
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
