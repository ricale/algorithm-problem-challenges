const colors = [0, 1, 2];
const others = [
  [1, 2],
  [0, 2],
  [0, 1],
];

function solution(n, rows) {
  const answers = [...new Array(n)].map(() => new Array(3).fill(0));
  for (const color of colors) {
    answers[0][color] = { value: 0, first: [] };
    answers[1][color] = { value: rows[1][color], first: [color] };
  }

  const getAddedItem = (idx, target, a, b) => {
    const itemA = answers[idx - 1][a];
    const itemB = answers[idx - 1][b];
    const added = itemA.value < itemB.value ? itemA : itemB;
    const first =
      itemA.value === itemB.value ? [itemA.first, itemB.first] : added.first;
    return { value: added.value + rows[idx][target], first };
  };

  for (let i = 2; i < n - 1; i++) {
    for (const color of colors) {
      answers[i][color] = getAddedItem(i, color, ...others[color]);
    }
  }

  const getResultItem = (target, a, b) => {
    const itemA = answers[n - 2][a];
    const itemB = answers[n - 2][b];

    const otherForA = Math.min(
      ...colors
        .filter(
          (c) =>
            c !== target && (itemA.first.length >= 2 || itemA.first[0] !== c)
        )
        .map((c) => rows[0][c])
    );

    const otherForB = Math.min(
      ...colors
        .filter(
          (c) =>
            c !== target && (itemB.first.length >= 2 || itemB.first[0] !== c)
        )
        .map((c) => rows[0][c])
    );

    return (
      rows[n - 1][target] +
      Math.min(itemA.value + otherForA, itemB.value + otherForB)
    );
  };

  for (const color of colors) {
    answers[n - 1][color] = getResultItem(color, ...others[color]);
  }

  console.log(Math.min(...answers[n - 1]));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
