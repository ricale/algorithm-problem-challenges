// 92%에서 시간 초과
function solution(w1, w2) {
  const pos = new Map();

  const [short, long] = w1.length < w2.length ? [w1, w2] : [w2, w1];

  if (long.indexOf(short) !== -1) {
    console.log(short.length);
    return;
  }

  for (let i = short.length - 1; i >= 0; i--) {
    const indices = pos.get(short[i]);
    if (indices) {
      indices.push(i);
    } else {
      pos.set(short[i], [i]);
    }
  }

  const nums = [];
  for (let i = 0; i < long.length; i++) {
    const indices = pos.get(long[i]);
    if (indices) {
      nums.push(...indices);
    }
  }

  let max = 1;
  const counts = [1];
  for (let i = 1; i < nums.length; i++) {
    counts[i] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && counts[i] < counts[j] + 1) {
        counts[i] = counts[j] + 1;
      }
    }
    if (max < counts[i]) {
      max = counts[i];
    }
  }

  console.log(max);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item) => {
  return item;
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
