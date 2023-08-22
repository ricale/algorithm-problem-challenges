function solution([n], nums) {
  const answers = new Array(n).fill(-1);
  const stack = [{ idx: 0, value: nums[0] }];

  for (let i = 1; i < nums.length; i++) {
    const value = nums[i];
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      if (top.value < value) {
        const popped = stack.pop();
        answers[popped.idx] = value;
      } else {
        break;
      }
    }
    stack.push({ idx: i, value });
  }

  console.log(answers.join(" "));
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
