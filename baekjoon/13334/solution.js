function pushTo(queue, item) {
  queue.push(item);
  let idx = queue.length - 1;

  while (idx > 0) {
    const pidx = Math.floor((idx + 1) / 2) - 1;

    if (queue[pidx] > queue[idx]) {
      [queue[pidx], queue[idx]] = [queue[idx], queue[pidx]];
      idx = pidx;
    } else {
      break;
    }
  }
}

function popFrom(queue) {
  const result = queue[0];
  queue[0] = queue[queue.length - 1];
  queue.length -= 1;

  let idx = 0;

  while ((idx + 1) * 2 - 1 < queue.length) {
    const lidx = (idx + 1) * 2 - 1;
    const ridx = (idx + 1) * 2;

    if (
      queue[lidx] &&
      queue[lidx] < queue[idx] &&
      (!queue[ridx] || queue[lidx] < queue[ridx])
    ) {
      [queue[lidx], queue[idx]] = [queue[idx], queue[lidx]];
      idx = lidx;
    } else if (queue[ridx] && queue[ridx] < queue[idx]) {
      [queue[ridx], queue[idx]] = [queue[idx], queue[ridx]];
      idx = ridx;
    } else {
      break;
    }
  }

  return result;
}

function solution(n, d, values) {
  const queue = [];
  let max = 0;
  for (let i = 0; i < values.length; i++) {
    const last = values[i];
    pushTo(queue, values[i][0]);

    while (queue[0] < last[1] - d) {
      popFrom(queue);
    }

    if (max < queue.length) {
      max = queue.length;
    }
  }

  console.log(max);
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
  const d = +cases[idx + n];
  const values = cases
    .slice(idx, idx + n)
    .reduce((acc, item) => {
      const splitted = item
        .trim()
        .split(" ")
        .map((it) => +it)
        .sort((a, b) => a - b);
      if (splitted[1] - splitted[0] > d) {
        return acc;
      }
      return [...acc, splitted];
    }, [])
    .sort((a, b) => a[1] - b[1]);
  idx += n;

  idx += 1;

  solution(n, d, values);
}
