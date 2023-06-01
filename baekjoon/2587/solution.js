function solution(...nums) {
  for (let i = 0; i < 5; i++) {
    for (let j = i + 1; j < 5; j++) {
      if (nums[i] > nums[j]) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
  }

  console.log(`${nums.reduce((acc, it) => acc + it) / 5}\n${nums[2]}`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const LINE_COUNT = 5;
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .reduce((acc, it, i) => {
      const splitted = it.trim().split(" ");
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(splitted.length === 1 ? +splitted[0] : splitted);

      return acc;
    }, []);

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(
    ...input.split("\n").map((it) => {
      const splitted = it.trim().split(" ");
      return splitted.length === 1 ? +splitted[0] : splitted;
    })
  );
}
