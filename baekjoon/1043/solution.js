// 그래프 탐색
function solution(n, m, people, parties) {
  if (people.length === 0) {
    console.log(m);
    return;
  }

  const connections = [...new Array(n + 1)].map(() => new Set());

  for (const members of parties) {
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      for (let j = 0; j < members.length; j++) {
        if (member !== members[j]) {
          connections[member].add(members[j]);
        }
      }
    }
  }

  const checked = new Array(n + 1).fill(false);
  for (const person of people) {
    checked[person] = true;
  }
  const queue = [...people];
  let qidx = 0;
  while (queue.length > qidx) {
    const item = queue[qidx++];

    const cands = connections[item];
    for (const cand of cands) {
      if (checked[cand]) {
        continue;
      }
      checked[cand] = true;
      queue.push(cand);
    }
  }

  let result = m;
  for (const members of parties) {
    for (const member of members) {
      if (checked[member]) {
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
