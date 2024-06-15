function getMStore(cands, selected, rest, onFind) {
  if (rest > cands.length) {
    return;
  }
  if (rest === 0) {
    onFind(selected);
    return;
  }
  for (let i = 0; i < cands.length; i++) {
    getMStore(cands.slice(i + 1), [...selected, cands[i]], rest - 1, onFind);
  }
}

function solution(n, m, rows) {
  const stores = [];
  const houses = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (rows[i][j] === 1) {
        houses.push({ y: i, x: j });
      } else if (rows[i][j] === 2) {
        stores.push({ y: i, x: j });
      }
    }
  }

  let result = Infinity;

  getMStore(
    stores.map((_, i) => i),
    [],
    m,
    (storeIndices) => {
      let sum = 0;
      for (const house of houses) {
        let min = Infinity;
        for (const storeIndex of storeIndices) {
          const store = stores[storeIndex];
          min = Math.min(
            min,
            Math.abs(store.y - house.y) + Math.abs(store.x - house.x)
          );
        }
        sum += min;
        if (sum > result) {
          return;
        }
      }
      result = Math.min(sum, result);
    }
  );

  console.log(result);
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
  const [n, m] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, m, rows);
}
