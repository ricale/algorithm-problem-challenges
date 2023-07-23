function bs(answers, num) {
  let left = 0;
  let right = answers.length - 1;
  let mid;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (answers[mid] < num) {
      left = mid + 1;
    } else if (answers[mid] > num) {
      right = mid - 1;
    } else {
      return;
    }
  }

  if (answers[mid] > num) {
    answers[mid] = num;
  } else {
    answers[mid + 1] = num;
  }
}

function solution([n], nums) {
  const answers = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    if (answers[answers.length - 1] < num) {
      answers.push(num);
    } else if (answers[0] > num) {
      answers[0] = num;
    } else {
      bs(answers, nums[i]);
    }
  }

  console.log(answers.length);
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
