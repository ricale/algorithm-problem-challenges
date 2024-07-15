function initTree(tree, nums, judge, start, end, node) {
  if (start === end) {
    tree[node] = nums[start];
  } else {
    const mid = Math.floor((start + end) / 2);
    tree[node] = judge(
      initTree(tree, nums, judge, start, mid, node * 2),
      initTree(tree, nums, judge, mid + 1, end, node * 2 + 1)
    );
  }
  return tree[node];
}

function getSubResult(tree, tStart, tEnd, judge, rLeft, rRight, node) {
  if (tEnd < rLeft || rRight < tStart) {
    return null;
  }

  if (tStart <= rLeft && rRight <= tEnd) {
    return tree[node];
  }

  const mid = Math.floor((rLeft + rRight) / 2);
  return judge(
    getSubResult(tree, tStart, tEnd, judge, rLeft, mid, node * 2),
    getSubResult(tree, tStart, tEnd, judge, mid + 1, rRight, node * 2 + 1)
  );
}

function updateValue(tree, target, newValue, judge, rLeft, rRight, node) {
  if (target < rLeft || rRight < target) {
    return tree[node];
  }

  if (rLeft === rRight) {
    tree[node] = newValue;
  } else {
    const mid = Math.floor((rLeft + rRight) / 2);
    tree[node] = judge(
      updateValue(tree, target, newValue, judge, rLeft, mid, node * 2),
      updateValue(tree, target, newValue, judge, mid + 1, rRight, node * 2 + 1)
    );
  }

  return tree[node];
}

function solveCase(n, k, rows) {
  // console.log(">>>>");
  // console.log({ n, k, rows });
  const maxTree = [];
  const minTree = [];
  const nums = [...new Array(n)].map((_, i) => i);
  const maxJudge = (a, b) => (a === null ? b : b === null ? a : Math.max(a, b));
  const minJudge = (a, b) => (a === null ? b : b === null ? a : Math.min(a, b));
  initTree(maxTree, nums, maxJudge, 0, n - 1, 1);
  initTree(minTree, nums, minJudge, 0, n - 1, 1);

  let result = "";
  for (const [q, a, b] of rows) {
    if (q === 0) {
      const aVal = nums[a];
      const bVal = nums[b];
      updateValue(maxTree, a, bVal, maxJudge, 0, n - 1, 1);
      updateValue(minTree, a, bVal, minJudge, 0, n - 1, 1);
      nums[a] = bVal;
      updateValue(maxTree, b, aVal, maxJudge, 0, n - 1, 1);
      updateValue(minTree, b, aVal, minJudge, 0, n - 1, 1);
      nums[b] = aVal;
    } else {
      const max = getSubResult(maxTree, a, b, maxJudge, 0, n - 1, 1);
      const min = getSubResult(minTree, a, b, minJudge, 0, n - 1, 1);
      if (max <= b && min >= a) {
        result += `YES\n`;
      } else {
        result += `NO\n`;
      }
    }
  }
  return result;
}

function solution(t, cases) {
  let result = "";
  for (const item of cases) {
    result += solveCase(...item);
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

const lines = input.split("\n").filter((item) => !!item);

let idx = 0;
while (idx < lines.length) {
  const t = +lines[idx++];
  const cases = [];
  for (let i = 0; i < t; i++) {
    const [n, k] = lines[idx++].split(" ").map((it) => +it);
    const rows = lines.slice(idx, idx + k).map((item) => {
      return item
        .trim()
        .split(" ")
        .map((it) => +it);
    });
    cases.push([n, k, rows]);
    idx += k;
  }

  solution(t, cases);
}
