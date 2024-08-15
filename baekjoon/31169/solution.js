function solution(n, rows) {
  const z = "z".charCodeAt(0);

  console.log(
    rows
      .map((line) =>
        line
          .split("")
          .map((char) => {
            const ciphered = char.charCodeAt(0) + 13;
            return String.fromCharCode(ciphered > z ? ciphered - 26 : ciphered);
          })
          .join("")
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
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item;
  });
  idx += n;

  solution(n, rows);
}
