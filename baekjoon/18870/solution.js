function solution([n], nums) {
  const obj = {};

  for (const num of nums) {
    obj[num] = 0;
  }

  const sortedKeys = Object.keys(obj).sort((a, b) => +a - +b);
  const len = sortedKeys.length;
  for (let i = 0; i < len; i++) {
    obj[sortedKeys[i]] = i;
  }

  console.log(nums.map((num) => obj[num]).join(" "));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (it) => {
  const splitted = it.trim().split(" ");
  return splitted.map((it) => +it);
};

if (isLocal) {
  const LINE_COUNT = 2;
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .reduce((acc, it, i) => {
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(mapper(it));
      return acc;
    }, []);

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
