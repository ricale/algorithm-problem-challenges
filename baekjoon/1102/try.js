function solution(n, rows, yn, p) {
  const answer = [...new Array(n + 1)].map(() => []);
  const getAnswer = (current, state) => {
    if (
      state
        .toString(2)
        .split("")
        .filter((item) => item === "1").length >= p
    ) {
      return 0;
    }
    // console.log({
    //   current,
    //   state: state.toString(2),
    //   answer: answer[current][state],
    // });

    if (answer[current][state]) {
      return answer[current][state];
    }

    let min = Infinity;
    for (let i = 0; i < n; i++) {
      if ((state & (1 << i)) === 0) {
        continue;
      }

      const cost = rows[i][current];
      const nextState = state | (1 << current);

      for (let j = 0; j < n; j++) {
        const bit = 1 << j;
        if ((state & bit) > 0) {
          continue;
        }
        const value = cost + getAnswer(j, nextState);
        if (min > value) {
          min = value;
        }
      }
    }

    answer[current][state] = min;
    return answer[current][state];
  };

  if (yn.indexOf("N") === -1) {
    console.log(0);
    return;
  }
  if (yn.indexOf("Y") === -1) {
    console.log(-1);
    return;
  }

  let initialState = 0;
  for (let i = n - 1; i >= 0; i--) {
    initialState *= 2;
    if (yn[i] === "Y") {
      initialState += 1;
    }
  }

  let min = Infinity;
  for (let j = 0; j < n; j++) {
    if (yn[j] === "Y") {
      continue;
    }

    min = Math.min(min, getAnswer(j, initialState));
  }

  if (min === Infinity) {
    console.log(-1);
    return;
  }

  // console.log(answer);
  console.log(min);
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
  const p = cases[idx++];

  solution(n, rows, yn, p);
}
