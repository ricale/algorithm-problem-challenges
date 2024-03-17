function encrypt(code, fromChar, toChar) {
  const from = fromChar.charCodeAt();
  const to = toChar.charCodeAt();
  if (from <= code && code <= to) {
    const encrypted = code + 13 <= to ? code + 13 : code - 13;
    return String.fromCharCode(encrypted);
  }
  return undefined;
}

function solution(s) {
  console.log(
    s
      .split("")
      .map((char) => {
        const code = char.charCodeAt();
        return encrypt(code, "a", "z") || encrypt(code, "A", "Z") || char;
      })
      .join("")
  );
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString();

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(item);
  });
} else {
  solution(input);
}
