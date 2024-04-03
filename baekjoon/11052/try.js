function getResult(n, sorted) {
  if (sorted.length === 0) {
    return 0;
  }

  const current = sorted[0];
  const maxCount = Math.floor(n / current.count);

  let max = 0;
  for (let i = 0; i <= maxCount; i++) {
    const count = current.count * i;
    const subResult = i * current.price + getResult(n - count, sorted.slice(1));
    max = Math.max(max, subResult);
  }

  return max;
}

function solution([n], packs) {
  console.log(
    getResult(
      n,
      packs.map((item, idx) => ({ count: idx + 1, price: item }))
    )
  );
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
