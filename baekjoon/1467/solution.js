const E = 15;
const S = 28;
const M = 19;
function solution(_e, _s, _m) {
  const e = _e === E ? 0 : _e;
  const s = _s === S ? 0 : _s;
  const m = _m === M ? 0 : _m;

  for (let i = 1; i <= E * S * M; i++) {
    if (i % E === e && i % S === s && i % M === m) {
      console.log(i);
      return;
    }
  }
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
