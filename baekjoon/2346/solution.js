function solution(n, balloons) {
  const result = [];
  const length = balloons.length;
  let i = 0;
  while (true) {
    let step = balloons[i];
    balloons[i] = null;
    result.push(i + 1);
    if (length === result.length) {
      break;
    }

    while (step !== 0) {
      i += step < 0 ? -1 : 1;
      if (i < 0) {
        i += length;
      } else if (i >= length) {
        i %= length;
      }
      if (balloons[i] !== null) {
        step += step < 0 ? 1 : -1;
      }
    }
  }

  console.log(result.join(" "));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item, idx) => {
  if (idx === 0) {
    return +item;
  }

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
      acc[index].push(mapper(item, i % LINE_COUNT));

      return acc;
    }, []);

  cases.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
