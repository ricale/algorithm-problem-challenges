function solution(X, N, rows) {
  console.log(
    X === rows.reduce((acc, it) => acc + +it[0] * +it[1], 0) ? "Yes" : "No"
  );
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString();

const cases = input.split("\n").filter((it) => !!it);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx + 1];
  const offset = 2;
  solution(
    +cases[idx],
    n,
    cases
      .slice(idx + offset, idx + n + offset)
      .map((it) => it.trim().split(" "))
  );
  idx += n + offset;
}
