function solution(a, b, c, d, e, f) {
  const [nb, nc] = [b * d, c * d];
  const [ne, nf] = [e * a, f * a];

  // (nb - ne) * y = (nc - nf);
  const y = nb - ne === 0 ? 0 : (nc - nf) / (nb - ne);

  // ax + by = c;
  // x = (c - by) / a
  const x = a !== 0 ? (c - b * y) / a : (f - e * y) / d;

  console.log(`${x} ${y}`);
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
    solution(...it.map((it) => +it));
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
