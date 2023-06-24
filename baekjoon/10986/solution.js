function solution([n, m], nums) {
  const mods = new Array(m).fill(0);

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += nums[i];
    mods[sum % m] += 1;
  }

  let result = 0;
  for (const count of mods) {
    if (count > 1) {
      result += (count * (count - 1)) / 2;
    }
  }

  console.log(result + mods[0]);
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
