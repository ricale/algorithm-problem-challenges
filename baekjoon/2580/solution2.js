function solution(...inputs) {
  const rowChecker = [...new Array(9)].map((_) => new Array(10).fill(false));
  const colChecker = [...new Array(9)].map((_) => new Array(10).fill(false));
  const recChecker = [...new Array(9)].map((_) => new Array(10).fill(false));
  const blanks = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const val = inputs[i][j];
      if (val !== 0) {
        rowChecker[i][val] = true;
        colChecker[j][val] = true;
        recChecker[Math.floor(i / 3) * 3 + Math.floor(j / 3)][val] = true;
      } else {
        blanks.push([i, j]);
      }
    }
  }

  function fillOut() {
    console.log("fillOut");
    if (blanks.length === 0) {
      return true;
    }
    const [y, x] = blanks[blanks.length - 1];

    const recIdx = Math.floor(y / 3) * 3 + Math.floor(x / 3);
    for (let i = 1; i < 10; i++) {
      if (!rowChecker[y][i] && !colChecker[x][i] && !recChecker[recIdx][i]) {
        rowChecker[y][i] = true;
        colChecker[x][i] = true;
        recChecker[recIdx][i] = true;
        inputs[y][x] = i;
        blanks.pop();
        if (fillOut(inputs, blanks)) {
          return true;
        }
        blanks.push([y, x]);
        inputs[y][x] = 0;
        rowChecker[y][i] = false;
        colChecker[x][i] = false;
        recChecker[recIdx][i] = false;
      }
    }
  }

  fillOut();

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
