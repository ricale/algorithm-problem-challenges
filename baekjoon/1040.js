function isValid(source, answer) {
  return +source.slice(0, answer.length) <= +answer.join("");
}

function getAnswer(source, k, answer = [], used = []) {
  // console.log(k, { used, answer });
  if (source.length === answer.length) {
    if (k > 0) {
      return null;
    }
    return answer;
  }

  if (k > 0) {
    for (let n = 0; n <= 9; n++) {
      const newAnswer = [...answer, n];
      if (!isValid(source, newAnswer)) {
        continue;
      }
      const usedAlready = used.includes(n);
      const result = usedAlready
        ? getAnswer(source, k, newAnswer, used)
        : getAnswer(
            source,
            k - 1,
            newAnswer,
            [...used, n].sort((a, b) => a - b)
          );

      if (result) {
        return result;
      }
    }
    return null;
  } else {
    for (let n of used) {
      const newAnswer = [...answer, n];
      if (!isValid(source, newAnswer)) {
        continue;
      }
      const result = getAnswer(source, 0, newAnswer, used);
      if (result) {
        return result;
      }
    }

    return null;
  }
}

function solution(N, K) {
  // console.log(">>>>>", { N, K });
  const k = +K;

  if (k > N.length) {
    const result = getAnswer(`1${"0".repeat(k - 1)}`, k);
    console.log(result.join(""));
    return;
  }

  const result = getAnswer(N, k);
  if (result) {
    console.log(result.join(""));
    return;
  }

  console.log(getAnswer(`1${"0".repeat(N.length - 1)}`, k).join(""));
}

//////
////
// input

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString();

const cases = input
  .split("\n")
  .filter((it) => !!it)
  .map((it) => it.trim().split(" "));

cases.forEach((it) => {
  solution(...it);
});
