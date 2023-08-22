function find2(n, m, rows) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (rows[i][j] === 2) {
        return [i, j];
      }
    }
  }
}

function solution(n, m, rows) {
  const answers = [...new Array(n)].map(() => new Array(m).fill(-1));

  const [i, j] = find2(n, m, rows);

  answers[i][j] = 0;
  const stack = [[i, j]];

  while (stack.length > 0) {
    const [y, x] = stack.pop();
    const value = answers[y][x] + 1;

    const nearPoses = [
      [y - 1, x],
      [y + 1, x],
      [y, x - 1],
      [y, x + 1],
    ];

    for (const [ny, nx] of nearPoses) {
      const tile = rows[ny]?.[nx];
      if (tile === 1) {
        if (answers[ny][nx] === -1 || answers[ny][nx] > value) {
          answers[ny][nx] = value;
          stack.push([ny, nx]);
        }
      } else if (tile === 0) {
        answers[ny][nx] = 0;
      }
    }
  }

  console.log(answers.map((answer) => answer.join(" ")).join("\n"));
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
  const [n, m] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(n, m, rows);

  idx += n + offset;
}
