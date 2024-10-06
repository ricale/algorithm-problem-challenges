function solution(floors, start, goal, up, down) {
  if (start === goal) {
    console.log(0);
    return;
  }

  const checked = new Set([start]);
  const queue = [[start, 0]];

  while (queue.length) {
    const [curr, count] = queue.shift();

    const cands = [curr + up, curr - down];

    for (const next of cands) {
      if (next === goal) {
        console.log(count + 1);
        return;
      }
      if (next >= 1 && next <= floors && !checked.has(next)) {
        checked.add(next);
        queue.push([next, count + 1]);
      }
    }
  }

  console.log("use the stairs");
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(
      ...item
        .trim()
        .split(" ")
        .map((it) => +it)
    );
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
