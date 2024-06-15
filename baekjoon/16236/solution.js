function solution(n, rows) {
  const counts = [...new Array(7)].fill(0);

  const shark = {
    x: 0,
    y: 0,
    size: 2,
    eatCount: 0,
    dist: 0,
  };
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const value = rows[i][j];
      if (value === 9) {
        shark.y = i;
        shark.x = j;
      } else if (value !== 0) {
        counts[value] += 1;
      }
    }
  }

  while (true) {
    let possibleCount = 0;
    for (let i = 1; i < Math.min(shark.size, 7); i++) {
      possibleCount += counts[i];
    }
    if (possibleCount === 0) {
      break;
    }

    const queue = [{ y: shark.y, x: shark.x, dist: 0 }];
    const checked = [...new Array(n)].map(() => new Array(n).fill(0));
    checked[shark.y][shark.x] = 1;
    const target = { y: undefined, x: undefined, dist: undefined };
    while (queue.length > 0) {
      const item = queue.shift();

      const cands = [
        [item.y - 1, item.x],
        [item.y + 1, item.x],
        [item.y, item.x - 1],
        [item.y, item.x + 1],
      ];

      for (let [ny, nx] of cands) {
        if (ny < 0 || ny >= n || nx < 0 || nx >= n) {
          continue;
        }
        if (target.dist !== undefined && target.dist < item.dist + 1) {
          break;
        }
        if (checked[ny][nx] === 1) {
          continue;
        }
        checked[ny][nx] = 1;
        if (rows[ny][nx] > shark.size) {
          continue;
        }
        if (rows[ny][nx] !== 0 && rows[ny][nx] < shark.size) {
          target.dist = item.dist + 1;
          if (target.y === undefined || target.y > ny) {
            target.y = ny;
            target.x = nx;
          } else if (target.y === ny && target.x > nx) {
            target.y = ny;
            target.x = nx;
          }
          continue;
        }
        queue.push({ y: ny, x: nx, dist: item.dist + 1 });
      }
    }

    if (target.y === undefined) {
      break;
    }

    const targetValue = rows[target.y][target.x];
    checked[targetValue] = 1;
    counts[targetValue] -= 1;
    rows[shark.y][shark.x] = 0;
    shark.y = target.y;
    shark.x = target.x;
    rows[target.y][target.x] = 9;
    shark.eatCount += 1;
    if (shark.eatCount === shark.size) {
      shark.eatCount = 0;
      shark.size += 1;
    }
    shark.dist += target.dist;
  }

  console.log(shark.dist);
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
