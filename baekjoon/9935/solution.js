function solution(source, target) {
  const chars = [];
  const stack = [];
  const sourceLength = source.length;

  const len = target.length;
  for (let i = 0; i < sourceLength; i++) {
    chars.push(source[i]);

    const idx = stack.length ? stack[stack.length - 1] + 1 : 0;
    if (source[i] === target[idx]) {
      if (idx === len - 1) {
        chars.length = chars.length - len;
        stack.length = stack.length - (len - 1);
      } else {
        stack.push(idx);
      }
    } else if (source[i] === target[0]) {
      stack.push(0);
    } else {
      stack.length = 0;
    }
  }

  console.log(chars.length ? chars.join("") : "FRULA");
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
