function solution([n], row) {
  const stack = [];
  const result = [0];

  let i = 0;
  while (i < row.length) {
    const num = row[i];
    const last = result[result.length - 1];
    if (num === last + 1) {
      result.push(num);
      i += 1;
    } else if (stack[stack.length - 1] === last + 1) {
      result.push(stack.pop());
    } else {
      stack.push(num);
      i += 1;
    }
  }

  while (stack.length > 0) {
    if (stack[stack.length - 1] === result[result.length - 1] + 1) {
      result.push(stack.pop());
    } else {
      console.log("Sad");
      return;
    }
  }

  console.log("Nice");
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
