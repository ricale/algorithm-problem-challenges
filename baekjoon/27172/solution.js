function solution([n], nums) {
  const checked = new Array(1_000_001).fill(false);

  let max = 0;
  for (const num of nums) {
    checked[num] = true;
    if (max < num) {
      max = num;
    }
  }

  const answers = new Array(max + 1).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = nums[i] + nums[i]; j <= max; j += nums[i]) {
      if (checked[j]) {
        answers[j] -= 1;
        answers[nums[i]] += 1;
      }
    }
  }

  console.log(nums.map((num) => answers[num]).join(" "));
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
