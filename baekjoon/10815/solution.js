function solution([N], nums, [M], cands) {
  const checked = new Set();
  for (const num of nums) {
    checked.add(num);
  }

  const result = cands.map((it) => (checked.has(it) ? 1 : 0)).join(" ");
  console.log(result);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (it) => {
  return it
    .trim()
    .split(" ")
    .map((it) => +it);
};

if (isLocal) {
  const LINE_COUNT = 4;
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
