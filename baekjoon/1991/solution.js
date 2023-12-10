function preorder(root, result) {
  result.push(root.value);
  if (root.left) preorder(root.left, result);
  if (root.right) preorder(root.right, result);
}

function inorder(root, result) {
  if (root.left) inorder(root.left, result);
  result.push(root.value);
  if (root.right) inorder(root.right, result);
}

function postorder(root, result) {
  if (root.left) postorder(root.left, result);
  if (root.right) postorder(root.right, result);
  result.push(root.value);
}

function solution(n, rows) {
  const nodeMap = new Map();

  const getNode = (id) => {
    const node = nodeMap.get(id);
    if (node) {
      return node;
    }
    const newNode = { value: id };
    nodeMap.set(id, newNode);
    return newNode;
  };

  for (const [c, l, r] of rows) {
    const current = getNode(c);
    const left = l === "." ? null : getNode(l);
    const right = r === "." ? null : getNode(r);
    current.left = left;
    current.right = right;
  }

  const root = nodeMap.get("A");
  const preorderResult = [];
  preorder(root, preorderResult);
  const inorderResult = [];
  inorder(root, inorderResult);
  const postorderResult = [];
  postorder(root, postorderResult);

  console.log(
    `${preorderResult.join("")}\n` +
      `${inorderResult.join("")}\n` +
      `${postorderResult.join("")}`
  );
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
    return item.trim().split(" ");
  });
  idx += n;

  solution(n, rows);
}
