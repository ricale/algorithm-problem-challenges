function solution(n, rows) {
  console.log(
    rows
      .map((line) =>
        line
          .split(" ")
          .map((word) => word.split("").reverse().join(""))
          .join(" ")
      )
      .join("\n")
  );
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
  const rows = cases.slice(idx, idx + n);
  idx += n;

  solution(n, rows);
}
