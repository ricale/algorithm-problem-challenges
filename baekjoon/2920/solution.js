function solution(...nums) {
  for (let i = 1; i < nums.length; i++) {
    if (Math.abs(nums[i] - nums[i - 1]) !== 1) {
      console.log("mixed");
      return;
    }
  }

  console.log(nums[1] - nums[0] > 0 ? "ascending" : "descending");
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
