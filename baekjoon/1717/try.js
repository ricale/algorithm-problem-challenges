function solution(n, m, rows) {
  const byMember = new Map();
  const bySet = new Map();

  for (let i = 0; i <= n; i++) {
    byMember.set(i, i);
    bySet.set(i, [i]);
  }

  let result = "";

  for (const [comm, a, b] of rows) {
    switch (comm) {
      case 0: {
        if (a === b) {
          break;
        }

        const setAId = byMember.get(a);
        const setA = bySet.get(setAId);
        const setBId = byMember.get(b);
        const setB = bySet.get(setBId);

        if (setAId === setBId) {
          break;
        }

        const [targetId, otherId, targetSet, otherSet] =
          setA.length >= setB.length
            ? [setAId, setBId, setA, setB]
            : [setBId, setAId, setB, setA];

        bySet.set(targetId, [...targetSet, ...otherSet]);
        for (const member of otherSet) {
          byMember.set(member, targetId);
        }
        bySet.delete(otherId);
        break;
      }
      case 1: {
        result += `${byMember.get(a) === byMember.get(b) ? "YES" : "NO"}\n`;
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
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, m, rows);
}
