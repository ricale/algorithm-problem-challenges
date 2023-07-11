function solution(...inputs) {
  const [a, b, c] = [BigInt(inputs[0]), inputs[1], BigInt(inputs[2])];

  function dnq(count) {
    if (count === 1) {
      return a % c;
    }

    const half = Math.floor(count / 2);
    const res = dnq(half);

    return count % 2 === 1 ? (res * res * a) % c : (res * res) % c;
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
