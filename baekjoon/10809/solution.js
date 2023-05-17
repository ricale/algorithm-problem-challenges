function solution(str) {
  const pos = new Array(26).fill(-1);

  let aIdx = "a".charCodeAt();
  for (let i = 0; i < str.length; i++) {
    const idx = str[i].charCodeAt() - aIdx;
    if (pos[idx] === -1) {
      pos[idx] = i;
    }
  }

  console.log(pos.join(" "));
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
