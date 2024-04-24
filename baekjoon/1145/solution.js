function isAnswer(nums, target) {
  return nums.filter((num) => target % num === 0).length >= 3;
}

function solution(...nums) {
  nums.sort((a, b) => a - b);

  for (let i = nums[2]; ; i++) {
    if (isAnswer(nums, i)) {
      console.log(i);
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

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(
      ...item
        .trim()
        .split(" ")
        .map((it) => +it)
    );
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
