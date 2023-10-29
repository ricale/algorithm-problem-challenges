class PriorityQueue {
  constructor(isAsc) {
    this.queue = [];
    this.comparator = isAsc
      ? (a = Infinity, b = Infinity) => a > b
      : (a = -Infinity, b = -Infinity) => a < b;
  }

  pop() {
    const result = this.queue[0];

    this.queue[0] = this.queue[this.queue.length - 1];
    this.queue.length -= 1;

    let idx = 0;
    while (idx < this.queue.length) {
      const rIdx = (idx + 1) * 2;
      const lIdx = rIdx - 1;
      const curr = this.queue[idx];
      const lval = this.queue[lIdx];
      const rval = this.queue[rIdx];

      if (
        this.comparator(curr, lval) &&
        (this.comparator(rval, lval) || rval === lval)
      ) {
        [this.queue[idx], this.queue[lIdx]] = [
          this.queue[lIdx],
          this.queue[idx],
        ];
        idx = lIdx;
      } else if (this.comparator(curr, rval)) {
        [this.queue[idx], this.queue[rIdx]] = [
          this.queue[rIdx],
          this.queue[idx],
        ];
        idx = rIdx;
      } else {
        break;
      }
    }

    return result;
  }

  push(value) {
    let idx = this.queue.length;
    this.queue[this.queue.length] = value;

    while (idx > 0) {
      const pIdx = Math.ceil(idx / 2) - 1;
      if (this.comparator(this.queue[pIdx], this.queue[idx])) {
        [this.queue[pIdx], this.queue[idx]] = [
          this.queue[idx],
          this.queue[pIdx],
        ];
        idx = pIdx;
      } else {
        break;
      }
    }
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

class DoublePriorityQueue {
  constructor() {
    this.ascQueue = new PriorityQueue(true);
    this.descQueue = new PriorityQueue(false);
    this.checked = new Map();
  }

  push(value) {
    this.ascQueue.push(value);
    this.descQueue.push(value);

    this.checked.set(value, (this.checked.get(value) ?? 0) + 1);
  }

  pop(isAsc) {
    const queue = isAsc ? this.ascQueue : this.descQueue;

    while (!queue.isEmpty()) {
      const popped = queue.pop();
      const checkedCount = this.checked.get(popped) ?? 0;
      if (checkedCount) {
        if (checkedCount === 1) {
          this.checked.delete(popped);
        } else {
          this.checked.set(popped, checkedCount - 1);
        }
        return popped;
      }
    }
  }
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const cases = fs.readFileSync(filePath).toString().trim().split("\n");

let idx = 0;
while (idx < cases.length) {
  let result = "";
  const n = +cases[idx++];

  for (let i = 0; i < n; i++) {
    const k = +cases[idx++];

    const queue = new DoublePriorityQueue();

    for (let j = 0; j < k; j++) {
      const [comm, value] = cases[idx++].split(" ");
      switch (comm) {
        case "I":
          queue.push(+value);
          break;
        case "D":
          queue.pop(+value === -1);
          break;
      }
    }

    // if (queue.isEmpty()) {
    //   result += "EMPTY\n";
    // } else {
    //   const min = queue.pop(true);
    //   const max = queue.pop(false) ?? min;
    //   result += `${max} ${min}\n`;
    // }
    const min = queue.pop(true);
    const max = queue.pop(false) ?? min;

    if (min !== undefined) {
      result += `${max} ${min}\n`;
    } else {
      result += "EMPTY\n";
    }
  }
  console.log(result);
}
