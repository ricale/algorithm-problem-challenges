function solution([n], nums) {
  let max = { length: 1 };
  const results = [{ length: 1 }];

  for (let i = 1; i < n; i++) {
    let subResult = { length: 0 };
    for (let j = i - 1; j >= 0; j--) {
      if (nums[i] > nums[j]) {
        if (subResult.length < results[j].length) {
          subResult = { ...results[j], last: j };
        }
      }
    }
    results[i] = { length: subResult.length + 1, last: subResult.last };
    if (max.length < results[i].length) {
      max = { ...results[i], current: i };
    }
  }

  if (max.length === 1) {
    console.log(`1\n${nums[0]}`);
  } else {
    const answer = [nums[max.current]];
    let item = max;
    while (item.last !== undefined) {
      answer.push(nums[item.last]);
      item = results[item.last];
    }
    console.log(`${answer.length}\n${answer.reverse().join(" ")}`);
  }
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
