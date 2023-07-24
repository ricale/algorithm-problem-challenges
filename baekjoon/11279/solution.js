function popFrom(heap) {
  if (heap.length === 0) {
    return 0;
  }

  const poped = heap[0];
  heap[0] = heap[heap.length - 1];
  heap.length = heap.length - 1;

  let index = 0;

  while (true) {
    const rightIndex = (index + 1) * 2;
    const leftIndex = rightIndex - 1;
    const rightValue = heap[rightIndex] ?? -1;
    const leftValue = heap[leftIndex] ?? -1;

    if (leftValue === -1 && rightValue === -1) {
      break;
    }

    if (leftValue > heap[index] && leftValue >= rightValue) {
      [heap[leftIndex], heap[index]] = [heap[index], heap[leftIndex]];
      index = leftIndex;
    } else if (rightValue > heap[index]) {
      [heap[rightIndex], heap[index]] = [heap[index], heap[rightIndex]];
      index = rightIndex;
    } else {
      break;
    }
  }

  return poped;
}

function pushTo(heap, num) {
  heap.push(num);
  let index = heap.length - 1;

  while (index > 0) {
    const parentIndex = Math.ceil(index / 2) - 1;
    if (heap[parentIndex] < heap[index]) {
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
