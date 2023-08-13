function solution([n], types, initials, [m], inputs) {
  const queue = initials.filter((_, i) => types[i] === 0);
  queue.reverse();
  let front = 0;
  let result = "";
  for (const val of inputs) {
    queue.push(val);
    result += `${queue[front++]} `;
  }

  console.log(result);
}

// 7 4 2 1 4

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item, i) => {
  return item
    .trim()
    .split(" ")
    .map((it) => +it);
};

if (isLocal) {
  const LINE_COUNT = 5;
  const cases = input
    .split("\n")
    .filter((item) => !!item)
    .reduce((acc, item, i) => {
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(mapper(item, i % LINE_COUNT));

      return acc;
    }, []);

  cases.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
