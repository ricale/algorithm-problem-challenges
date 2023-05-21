function solution(N, B) {
  const scale = +B;
  let num = +N;
  let result = "";

  let baseCharCode = "A".charCodeAt(0);

  while (num > 0) {
    const n = num % scale;
    result = `${
      n < 10 ? n : String.fromCharCode(baseCharCode + n - 10)
    }${result}`;
    num = Math.floor(num / scale);
  }

  console.log(result);
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
