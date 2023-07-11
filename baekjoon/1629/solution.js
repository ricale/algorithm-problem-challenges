function solution(a, b, c) {
  const cached = new Map();
  cached.set(1, BigInt(a % c));

  function dnq(count) {
    const cache = cached.get(count);
    if (cache !== undefined) {
      return cache;
    }

    const mod2 = count % 2;
    const half = Math.floor(count / 2);
    const result = (dnq(half) * dnq(half + mod2)) % BigInt(c);
    cached.set(count, BigInt(result));
    return result;
  }

  console.log(dnq(b).toString());
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
