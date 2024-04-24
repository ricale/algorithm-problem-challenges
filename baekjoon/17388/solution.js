function solution(s, k, h) {
  if (s + k + h >= 100) {
    console.log("OK");
    return;
  }

  if (s < k && s < h) {
    console.log("Soongsil");
    return;
  }

  if (k < s && k < h) {
    console.log("Korea");
    return;
  }

  console.log("Hanyang");
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
