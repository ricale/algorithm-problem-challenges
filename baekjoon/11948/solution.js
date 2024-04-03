function solution(...inputs) {
  const [a, b, c, d, e, f] = inputs;
  console.log(
    inputs.reduce((acc, item) => acc + item, 0) -
      Math.min(a, b, c, d) -
      Math.min(e, f)
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
  return +item;
};

if (isLocal) {
  const LINE_COUNT = 6;
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
