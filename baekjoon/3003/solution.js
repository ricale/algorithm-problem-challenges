function solution(...pieces) {
  const counts = [1, 1, 2, 2, 2, 8];
  console.log(counts.map((it, i) => it - +pieces[i]).join(" "));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .map((it) => it.trim().split(" "));

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(...input.trim().split(" "));
}
