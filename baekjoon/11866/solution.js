function Node(value, prev = null, next = null) {
  this.value = value;
  this.prev = prev;
  this.next = next;
}

function solution(n, k) {
  const head = new Node(1);
  let node = head;
  for (let i = 1; i < n; i++) {
    node.next = new Node(i + 1, node);
    node = node.next;
  }
  node.next = head;
  head.prev = node;

  let result = [];
  node = head;
  while (true) {
    for (let i = 0; i < k - 1; i++) {
      node = node.next;
    }
    result.push(node.value);
    if (node.next === node) {
      break;
    }
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node = node.next;
  }

  console.log(`<${result.join(", ")}>`);
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input
    .split("\n")
    .filter((it) => !!it)
    .map((it) =>
      it
        .trim()
        .split(" ")
        .map((n) => +n)
    );

  cases.forEach((it) => {
    solution(...it);
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((n) => +n)
  );
}
