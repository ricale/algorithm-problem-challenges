function solution(A, B) {
  const length = Math.max(A.length, B.length);

  let result = "";
  let i = A.length - 1;
  let j = B.length - 1;
  let more = 0;

  while (i >= 0 || j >= 0) {
    const added = +(A[i] ?? 0) + +(B[j] ?? 0) + more;
    more = added >= 10 ? 1 : 0;
    result = `${added % 10}${result}`;
    i -= 1;
    j -= 1;
  }

  console.log(more ? `${more}${result}` : `${result}`);
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
