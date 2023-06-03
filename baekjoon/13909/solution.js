function solution(n) {
  // const windows = new Array(n).fill(1);

  // for (let i = 2; i <= n; i++) {
  //   for (let j = i; j <= n; j += i) {
  //     windows[j - 1] = windows[j - 1] === 1 ? 0 : 1;
  //   }
  // }

  // console.log(windows.filter((it) => it === 1).length);

  const sqrt = Math.sqrt(n);
  console.log(Math.floor(sqrt));
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
    .map((it) => +it);

  cases.forEach((it) => {
    solution(it);
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
