function solution(n, k) {
  let nfac = 1;
  for (let i = n - k + 1; i <= n; i++) {
    nfac *= i;
  }
  for (let i = 1; i <= k; i++) {
    nfac /= i;
  }
  console.log(nfac);
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
    .map((it) =>
      it
        .trim()
        .split(" ")
        .map((it) => +it)
    );

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
