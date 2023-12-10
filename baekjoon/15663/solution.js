function getAnswers(nums, m, current, results) {
  if (m === 0) {
    results.push(current);
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    getAnswers(
      [...nums.slice(0, i), ...nums.slice(i + 1)],
      m - 1,
      [...current, nums[i]],
      results
    );
  }
}

function solution([n, m], nums) {
  nums.sort((a, b) => a - b);
  const results = [];
  getAnswers(nums, m, [], results);
  console.log(results.map((row) => row.join(" ")).join("\n"));
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
