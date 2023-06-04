function solution([n, m], targets) {
  let count = 0;

  const deque = [...new Array(n)].map((_, i) => i + 1);

  while (targets.length > 0) {
    const pos = deque.indexOf(targets[0]);

    if (pos < deque.length - pos) {
      for (let i = 0; i < pos; i++) {
        deque.push(deque.shift());
        count += 1;
      }
      deque.shift();

      targets.shift();
    } else {
      const c = deque.length - pos - 1;
      for (let i = 0; i < c; i++) {
        deque.unshift(deque.pop());
        count += 1;
      }
      count += 1;
      deque.pop();
      targets.shift();
    }
  }
  console.log(count);
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
