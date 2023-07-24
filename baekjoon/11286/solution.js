function popFrom(heap) {
  if (heap.length === 0) {
    return 0;
  }

  const popped = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.length = heap.length - 1;

  let index = 0;
  while (true) {
    const rightIndex = (index + 1) * 2;
    const leftIndex = rightIndex - 1;

    if (heap[rightIndex] === undefined && heap[leftIndex] === undefined) {
      break;
    }

    const leftVal = heap[leftIndex] ?? Infinity;
    const rightVal = heap[rightIndex] ?? Infinity;
    const leftAbs = Math.abs(leftVal);
    const rightAbs = Math.abs(rightVal);

    const [minIndex, minAbs, minVal] =
      leftAbs < rightAbs || (leftAbs === rightAbs && leftVal < rightVal)
        ? [leftIndex, leftAbs, leftVal]
        : [rightIndex, rightAbs, rightVal];

    const currAbs = Math.abs(heap[index]);
    if (minAbs < currAbs || (minAbs == currAbs && minVal < heap[index])) {
      [heap[minIndex], heap[index]] = [heap[index], heap[minIndex]];
      index = minIndex;
    } else {
      break;
    }
  }

  return popped;
}

function pushTo(heap, num) {
  heap.push(num);
  let index = heap.length - 1;
  while (index > 0) {
    const parentIndex = Math.ceil(index / 2) - 1;
    const parentAbs = Math.abs(heap[parentIndex]);
    const currAbs = Math.abs(heap[index]);
    if (
      parentAbs > currAbs ||
      (parentAbs === currAbs && heap[parentIndex] > heap[index])
    ) {
      [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
      index = parentIndex;
    } else {
      break;
    }
  }
}

function solution(n, rows) {
  const heap = [];
  let result = "";
  for (const num of rows) {
    if (num === 0) {
      result += `${popFrom(heap)}\n`;
    } else {
      pushTo(heap, num);
    }
  }

  console.log(result);
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
  const n = +cases[idx];
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return +item;
  });
  solution(n, rows);

  idx += n + offset;
}
