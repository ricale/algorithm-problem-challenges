function bs(results, num) {
  let l = 0;
  let r = results.length;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (results[mid] < num) {
      l = mid + 1;
    } else if (results[mid] > num) {
      r = mid;
    } else {
      return mid;
    }
  }

  const mid = Math.floor((l + r) / 2);
  if (results[mid] > num) {
    results[mid] = num;
    return mid;
  } else {
    results[mid + 1] = num;
    return mid + 1;
  }
}

function solution([n], nums) {
  const results = [nums[0]];
  const indices = [0];

  for (let i = 1; i < n; i++) {
    if (results[results.length - 1] < nums[i]) {
      results.push(nums[i]);
      indices.push(results.length - 1);
    } else if (results[0] >= nums[i]) {
      results[0] = nums[i];
      indices.push(0);
    } else {
      indices.push(bs(results, nums[i]));
    }
  }

  const length = results.length;
  let curr = length - 1;
  const answer = [];
  for (let i = n - 1; i >= 0 && curr >= 0; i--) {
    if (indices[i] === curr) {
      answer[curr] = nums[i];
      curr -= 1;
    }
  }

  console.log(`${length}\n${answer.join(" ")}`);
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
