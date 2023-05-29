function solution(...inputs) {
  const [as, c, n0] = [inputs[0], +inputs[1], +inputs[2]];
  const [a1, a0] = [+as[0], +as[1]];
  if (a1 - c > 0) {
    console.log(0);
    return;
  }
  if (a1 - c < 0) {
    console.log(n0 >= -a0 / (a1 - c) ? 1 : 0);
    return;
  }
  console.log(0 <= -a0 ? 1 : 0);

  // (a1 * n) + a0 <= c * n
  // (a1 * n) + a0 - c * n <= 0
  // (a1 - c) * n <= -a0
  // n <= -a0 / (a1 - c)

  // (a1 - c) * n <= -a0
  // a1 - c > 0 =>   n <= -a0 / (a1 - c)
  // a1 - c < 0 =>   n >= -a0 / (a1 - c)

  // 7 * n + 7 <= 8 * n
  // 7 * n + 7 - 8 * n <= 0
  // (7 - 8) * n <= -7
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const LINE_COUNT = 3;
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .reduce((acc, it, i) => {
      const splitted = it.trim().split(" ");
      const index = Math.floor(i / LINE_COUNT);
      if (!acc[index]) {
        acc[index] = [];
      }
      acc[index].push(splitted.length === 1 ? splitted[0] : splitted);

      return acc;
    }, []);

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(
    ...input.split("\n").map((it) => {
      const splitted = it.trim().split(" ");
      return splitted.length === 1 ? splitted[0] : splitted;
    })
  );
}
