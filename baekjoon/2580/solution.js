function fillOut(inputs, blanks) {
  if (blanks.length === 0) {
    return true;
  }
  const [y, x] = blanks[blanks.length - 1];
  const checked = new Array(10).fill(false);

  for (let i = 0; i < 9; i++) {
    checked[inputs[y][i]] = true;
    checked[inputs[i][x]] = true;

    const rx = Math.floor(x / 3) * 3 + (i % 3);
    const ry = Math.floor(y / 3) * 3 + Math.floor(i / 3);
    checked[inputs[ry][rx]] = true;
  }

  for (let i = 1; i < 10; i++) {
    if (!checked[i]) {
      inputs[y][x] = i;
      blanks.pop();
      if (fillOut(inputs, blanks)) {
        return true;
      }
      blanks.push([y, x]);
      inputs[y][x] = 0;
    }
  }
}

function solution(...inputs) {
  const blanks = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (inputs[i][j] === 0) {
        blanks.push([i, j]);
      }
    }
  }
  fillOut(inputs, blanks);

  console.log(inputs.map((item) => item.join(" ")).join("\n"));
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
  const LINE_COUNT = 9;
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
