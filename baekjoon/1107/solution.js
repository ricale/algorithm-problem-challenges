const DEFAULT = 100;

function findBigger(digits, pos, possibles) {
  const copied = [...digits];
  while (pos >= 0) {
    const found = possibles.find((it) => it > copied[pos]);
    if ((pos > 0 && found !== undefined) || (pos === 0 && !!found)) {
      copied[pos] = found;
      for (let i = pos + 1; i < copied.length; i++) {
        copied[i] = possibles[0];
      }
      return +copied.join("");
    }

    pos -= 1;
  }

  const head = possibles[0] > 0 ? possibles[0] : possibles[1];
  if (!head) {
    return null;
  }

  return +`${head}${`${possibles[0]}`.repeat(digits.length)}`;
}

function findSmaller(digits, pos, possibles) {
  const copied = [...digits];
  while (pos >= 0) {
    const found = possibles.find((it) => it < copied[pos]);
    if ((pos > 0 && found !== undefined) || (pos === 0 && !!found)) {
      copied[pos] = found;
      for (let i = pos + 1; i < copied.length; i++) {
        copied[i] = possibles[0];
      }
      return +copied.join("");
    }

    pos -= 1;
  }

  if (digits.length === 1) {
    return possibles[possibles.length - 1] === 0 ? 0 : null;
  }

  if (possibles[0] === 0) {
    return 0;
  }

  return +`${possibles[0]}`.repeat(digits.length - 1);
}

function solution([target], [m], brokens = []) {
  if (target === DEFAULT) {
    console.log(0);
    return;
  }

  let min = Math.abs(target - DEFAULT);

  if (m === 10) {
    console.log(min);
    return;
  }

  if (m === 0) {
    console.log(Math.min(min, `${target}`.length));
    return;
  }

  const possibles = [...new Array(10)]
    .map((_, i) => i)
    .filter((it) => !brokens.includes(it));

  const digits = `${target}`.split("").map((it) => +it);
  let pos = 0;
  for (; pos < digits.length; pos++) {
    if (brokens.includes(digits[pos])) {
      break;
    }
  }

  if (pos === digits.length) {
    console.log(Math.min(min, digits.length));
    return;
  }

  let bigger = findBigger(digits, pos, possibles);
  if (bigger !== null) {
    let biggerCount = `${bigger}`.length + (bigger - target);
    if (min > biggerCount) {
      min = biggerCount;
    }
  }

  let smaller = findSmaller(digits, pos, [...possibles].reverse());
  if (smaller !== null) {
    const smallerCount = `${smaller}`.length + (target - smaller);
    if (min > smallerCount) {
      min = smallerCount;
    }
  }

  console.log(min);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

const mapper = (item) => {
  return item
    .trim()
    .split(" ")
    .map((it) => +it);
};

if (isLocal) {
  let i = 0;
  let cidx = 0;
  const lines = input.split("\n").filter((item) => !!item);
  const cases = [];

  while (i < lines.length) {
    if (!cases[cidx]) {
      cases[cidx] = [mapper(lines[i++])];
    } else {
      const item = lines[i++];
      cases[cidx].push(mapper(item));
      if (item !== "0") {
        cases[cidx].push(mapper(lines[i++]));
      }
      cidx++;
    }
  }

  cases.forEach((item) => {
    solution(...item);
  });
} else {
  solution(...input.split("\n").map(mapper));
}
