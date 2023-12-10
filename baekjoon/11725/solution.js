function solution(n, rows) {
  const conns = [...new Array(n + 1)].map(() => []);

  for (const [a, b] of rows) {
    conns[a].push(b);
    conns[b].push(a);
  }

  const answer = [...new Array(n + 1)].fill(null);
  answer[1] = 0;

  const queue = [1];
  let qidx = 0;
  while (queue.length > qidx) {
    const shifted = queue[qidx++];

    for (const item of conns[shifted]) {
      if (answer[item] === null) {
        answer[item] = shifted;
        queue.push(item);
      }
    }
  }

  console.log(answer.slice(2).join("\n"));
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
  const rows = cases.slice(idx, idx + n - 1).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n - 1;

  solution(n, rows);
}
