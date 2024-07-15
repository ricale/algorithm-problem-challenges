function solution(n, rows, yn, p) {
  const answer = [...new Array(Math.pow(2, n))].fill(-1);
  const getAnswer = (state) => {
    if (
      state
        .toString(2)
        .split("")
        .filter((item) => item === "1").length >= p
    ) {
      return 0;
    }
    if (answer[state] !== -1) {
      return answer[state];
    }

    let min = Infinity;
    for (let i = 0; i < n; i++) {
      if ((state & (1 << i)) === 0) {
        continue;
      }

      for (let j = 0; j < n; j++) {
        if ((state & (1 << j)) > 0) {
          continue;
        }
        const value = rows[i][j] + getAnswer(state | (1 << j));
        if (min > value) {
          min = value;
        }
      }
    }

    answer[state] = min;
    return answer[state];
  };

  if (p === 0) {
    console.log(0);
    return;
  }

  let yCount = 0;
  let initialState = 0;
  for (let i = n - 1; i >= 0; i--) {
    initialState *= 2;
    if (yn[i] === "Y") {
      yCount += 1;
      initialState += 1;
    }
  }

  if (yCount === 0) {
    console.log(-1);
    return;
  }
  if (yCount >= p) {
    console.log(0);
    return;
  }

  const result = getAnswer(initialState);

  if (result === Infinity) {
    console.log(-1);
  } else {
    console.log(result);
  }
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const cases = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < cases.length) {
  const n = +cases[idx++];
  const rows = cases.slice(idx, idx + n).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;
  const yn = cases[idx++];
  const p = +cases[idx++];

  solution(n, rows, yn, p);
}
