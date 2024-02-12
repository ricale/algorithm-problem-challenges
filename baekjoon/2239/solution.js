function getCands(board, y, x) {
  const availables = new Array(10).fill(true);

  for (let k = 0; k < 9; k++) {
    availables[board[k][x]] = false;
    availables[board[y][k]] = false;
    availables[
      board[Math.floor(y / 3) * 3 + Math.floor(k / 3)][
        Math.floor(x / 3) * 3 + (k % 3)
      ]
    ] = false;
  }

  return availables.reduce((acc, item, i) => {
    if (item) {
      acc.push(i);
    }
    return acc;
  }, []);
}

function getAnswer(board, idx) {
  while (idx < 81) {
    const y = Math.floor(idx / 9);
    const x = idx % 9;

    if (board[y][x] === 0) {
      const cands = getCands(board, y, x);
      if (cands.length === 0) {
        return false;
      }
      for (const cand of cands) {
        board[y][x] = cand;
        const result = getAnswer(board, y * 9 + x + 1);
        if (result) {
          return true;
        }
      }
      board[y][x] = 0;
      return false;
    }
    idx += 1;
  }

  return true;
}

function solution(...board) {
  getAnswer(board, 0);

  console.log(board.map((row) => row.join("")).join("\n"));
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
    .split("")
    .map((it) => +it);
};

if (isLocal) {
  const LINE_COUNT = 9;
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
