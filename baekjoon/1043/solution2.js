function getParent(roots, node) {
  if (roots[node] === node) {
    return node;
  }
  roots[node] = getParent(roots, roots[node]);
  return roots[node];
}

// 유니온파인드
function solution(n, m, people, parties) {
  if (people.length === 0) {
    console.log(m);
    return;
  }

  const roots = [...new Array(n + 1)].map((_, idx) => idx);

  for (const members of parties) {
    if (members.length <= 1) {
      continue;
    }
    const parentOf0 = getParent(roots, members[0]);
    for (let i = 1; i < members.length; i++) {
      const parentOfI = getParent(roots, members[i]);
      roots[parentOfI] = parentOf0;
    }
  }

  const parents = new Set(people.map((person) => getParent(roots, person)));

  let result = m;
  for (const members of parties) {
    for (const member of members) {
      if (parents.has(getParent(roots, member))) {
        result -= 1;
        break;
      }
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
  const [n, m] = cases[idx++].split(" ").map((it) => +it);
  const [_, ...people] = cases[idx++].split(" ").map((it) => +it);
  const rows = cases.slice(idx, idx + m).map((item) => {
    const [__, ...participants] = item
      .trim()
      .split(" ")
      .map((it) => +it);
    return participants;
  });
  idx += m;

  solution(n, m, people, rows);
}
