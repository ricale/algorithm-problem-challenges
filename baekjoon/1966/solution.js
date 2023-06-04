function solution(n, rows) {
  let result = [];
  for (let i = 0; i < n; i++) {
    const [n, m] = rows[i * 2];
    const queue = rows[i * 2 + 1].map((it, i) => ({
      value: it,
      target: i === m,
    }));

    const targetPriority = queue[m].value;

    const priorities = [
      ...queue
        .reduce((acc, it) => {
          if (it.value >= targetPriority) {
            acc.set(it.value, (acc.get(it.value) ?? 0) + 1);
          }
          return acc;
        }, new Map())
        .entries(),
    ].sort((a, b) => a[0] - b[0]);

    let front = 0;
    let printed = 0;

    while (true) {
      const top = priorities[priorities.length - 1];

      if (queue[front].value === top[0]) {
        printed += 1;

        if (queue[front].target) {
          result.push(printed);
          break;
        }

        top[1] -= 1;
        if (top[1] === 0) {
          priorities.pop();
        }
        front += 1;
      } else {
        queue.push(queue[front]);
        front += 1;
      }
    }
  }
  console.log(result.join("\n"));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n * 2 + offset).map((it) => {
    return it
      .trim()
      .split(" ")
      .map((n) => +n);
  });
  solution(n, rows);

  idx += n * 2 + offset;
}
