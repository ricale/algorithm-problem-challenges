function solution([n], nums) {
  const asc = [1];
  const desc = [];
  desc[n - 1] = 1;

  for (let i = 1; i < n; i++) {
    asc[i] = 1;
    const di = n - 1 - i;
    desc[di] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        asc[i] = Math.max(asc[j] + 1, asc[i]);
      }
      const dj = n - 1 - j;
      if (nums[dj] < nums[di]) {
        desc[di] = Math.max(desc[dj] + 1, desc[di]);
      }
    }
  }

  const result = Math.max(...asc.map((it, i) => it + desc[i] - 1));
  console.log(result);
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
