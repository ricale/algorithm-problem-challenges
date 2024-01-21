function solution(n, m, rows) {
  const findIsland = (i, j, id) => {
    const queue = [[i, j]];
    let qidx = 0;
    while (queue.length > qidx) {
      const [y, x] = queue[qidx++];
      rows[y][x] = id;
      const cands = [
        [y, x - 1],
        [y, x + 1],
        [y - 1, x],
        [y + 1, x],
      ];
      for (const [y2, x2] of cands) {
        if (y2 >= 0 && y2 < n && x2 >= 0 && x2 < m && rows[y2][x2] === 1) {
          queue.push([y2, x2]);
        }
      }
    }
  };

  let islandId = 2;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (rows[i][j] === 1) {
        findIsland(i, j, islandId++);
      }
    }
  }

  // console.log(rows.map((row) => row.join(" ")).join("\n"), "\n");

  const routes = [...new Array(islandId)].map(() => new Map());

  const findRoutes = (i, j) => {
    const start = rows[i][j];
    const dir = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (const [y, x] of dir) {
      let i2 = i;
      let j2 = j;
      while (true) {
        i2 += y;
        j2 += x;
        if (i2 < 0 || i2 >= n || j2 < 0 || j2 >= m) {
          break;
        }
        const current = rows[i2][j2];
        if (rows[i2][j2] === 0) {
          continue;
        }
        if (rows[i2][j2] <= start) {
          break;
        }
        if (rows[i2][j2] > start) {
          const length = j2 === j ? Math.abs(i2 - i) - 1 : Math.abs(j2 - j) - 1;
          const last = routes[start].get(current) || Infinity;
          if (length > 1 && length < last) {
            routes[start].set(current, length);
          }
          break;
        }
      }
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (rows[i][j] !== 0) {
        findRoutes(i, j);
      }
    }
  }

  // console.log(routes);

  const queue = [];
  for (let i = 2; i < islandId; i++) {
    const map = routes[i];
    for (const [key, value] of map.entries()) {
      queue.push({ a: i, b: key, weight: value });
    }
  }
  queue.sort((a, b) => a.weight - b.weight);

  const roots = [...new Array(islandId)].map((_, idx) => idx);

  const getRoot = (node) => {
    if (roots[node] !== node) {
      roots[node] = getRoot(roots[node]);
    }
    return roots[node];
  };

  let sum = 0;
  for (const { a, b, weight } of queue) {
    const rootA = getRoot(a);
    const rootB = getRoot(b);
    if (rootA !== rootB) {
      sum += weight;
      roots[rootB] = rootA;
    }
  }

  // console.log(roots);

  for (let i = 3; i < islandId; i++) {
    if (getRoot(2) !== getRoot(i)) {
      console.log(-1);
      return;
    }
  }

  console.log(sum);
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
