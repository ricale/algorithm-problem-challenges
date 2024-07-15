function solution(...inputs) {
  const numberIndex = inputs.findIndex((item) => !isNaN(+item));
  const target = +inputs[numberIndex] + (3 - numberIndex);
  console.log(
    target % 3 === 0 && target % 5 === 0
      ? "FizzBuzz"
      : target % 3 === 0
      ? "Fizz"
      : target % 5 === 0
      ? "Buzz"
      : target
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
  return item;
};

if (isLocal) {
  const LINE_COUNT = 3;
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
