// https://www.acmicpc.net/source/19208120 풀이 따라하기
function solution(n, m, rows) {
  const nodes = new Array(n + 1).fill(0);
  const groups = [null];

  for (const [n1, n2] of rows) {
    if (nodes[n1] === 0) {
      if (nodes[n2] === 0) {
        const group = groups.length;
        nodes[n1] = group;
        nodes[n2] = group;
        groups[group] = [n1, n2];
      } else {
        const group = nodes[n2];
        nodes[n1] = group;
        groups[group].push(n1);
      }
    } else {
      if (nodes[n2] === 0) {
        const group = nodes[n1];
        nodes[n2] = group;
        groups[group].push(n2);
      } else if (nodes[n1] !== nodes[n2]) {
        const group = nodes[n1];
        const node2Group = groups[nodes[n2]];
        while (node2Group.length > 0) {
          const popped = node2Group.pop();
          groups[group].push(popped);
          nodes[popped] = group;
        }
      }
    }
  }

  console.log(
    groups.filter((group) => group?.length > 1).length +
      nodes.slice(1).filter((node) => node === 0).length
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
  const [m, n] = cases[idx].split(" ").map((it) => +it);
  const offset = 1;
  const rows = cases.slice(idx + offset, idx + n + offset).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  solution(m, n, rows);

  idx += n + offset;
}
