function getAnswer(checked, n) {
  const queue = [n];
  while (queue.length > 0) {
    const qlen = queue.length;
    for (let i = 0; i < qlen; i++) {
      const item = queue.shift();
      const checkedItem = checked.get(item);
      const cands = [];
      if (item % 3 === 0) {
        cands.push(item / 3);
      }
      if (item % 2 === 0) {
        cands.push(item / 2);
      }
      cands.push(item - 1);
      for (const cand of cands) {
        const checkedCand = checked.get(cand);
        if (!checkedCand || checkedCand.count > checkedItem.count + 1) {
          checked.set(cand, { last: item, count: checkedItem.count + 1 });
          queue.push(cand);
        }
        if (cand === 1) {
          return;
        }
      }
    }
  }
}

function solution(n) {
  if (n === 1) {
    console.log(`0\n1`);
    return;
  }
  const checked = new Map();
  checked.set(n, { last: null, count: 0 });
  getAnswer(checked, n);

  const result = [1];
  while (true) {
    const { last } = checked.get(result[result.length - 1]);
    if (last === null) {
      break;
    }
    result.push(last);
  }
  result.reverse();
  console.log(`${result.length - 1}\n${result.join(" ")}`);
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
    solution(+item);
  });
} else {
  solution(+input);
}
