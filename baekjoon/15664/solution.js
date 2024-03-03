function getAnswer(m, cands, current = [], result = []) {
  if (current.length === m) {
    result.push([...current]);
    return result;
  }

  for (let i = 0; i < cands.length; i++) {
    if (i > 0 && cands[i - 1] === cands[i]) {
      continue;
    }
    getAnswer(m, cands.slice(i + 1), [...current, cands[i]], result);
  }

  return result;
}

function solution([n, m], nums) {
  nums.sort((a, b) => a - b);

  const result = getAnswer(m, nums);
  console.log(result.map((row) => row.join(" ")).join("\n"));
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
