function solution([n], nums) {
  const counts = new Map();

  for (const num of nums) {
    counts.set(num, (counts.get(num) ?? 0) + 1);
  }

  const stack = [0];
  for (let i = 1; i < n; i++) {
    while (stack.length > 0) {
      const idx = stack[stack.length - 1];
      const num = nums[idx];
      if (counts.get(num) < counts.get(nums[i])) {
        stack.pop();
        nums[idx] = nums[i];
      } else {
        break;
      }
    }
    stack.push(i);
  }

  while (stack.length > 0) {
    nums[stack.pop()] = -1;
  }

  console.log(nums.join(" "));
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
