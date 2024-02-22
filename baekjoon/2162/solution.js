function meet([x1, y1, x2, y2], [x3, y3, x4, y4]) {
  const l12 = [x2 - x1, y2 - y1];
  const l13 = [x3 - x1, y3 - y1];
  const l14 = [x4 - x1, y4 - y1];

  const ccw123 = l12[0] * l13[1] - l12[1] * l13[0];
  const ccw124 = l12[0] * l14[1] - l12[1] * l14[0];

  if ((ccw123 > 0 && ccw124 > 0) || (ccw123 < 0 && ccw124 < 0)) {
    return false;
  }

  if (ccw123 === 0 && ccw124 === 0) {
    const [l12xMin, l12xMax] = x1 < x2 ? [x1, x2] : [x2, x1];
    if ((x3 < l12xMin && x4 < l12xMin) || (l12xMax < x3 && l12xMax < x4)) {
      return false;
    }

    const [l12yMin, l12yMax] = y1 < y2 ? [y1, y2] : [y2, y1];
    if ((y3 < l12yMin && y4 < l12yMin) || (l12yMax < y3 && l12yMax < y4)) {
      return false;
    }
  }

  const l34 = [x4 - x3, y4 - y3];
  const l31 = [x1 - x3, y1 - y3];
  const l32 = [x2 - x3, y2 - y3];

  const ccw341 = l34[0] * l31[1] - l34[1] * l31[0];
  const ccw342 = l34[0] * l32[1] - l34[1] * l32[0];

  if ((ccw341 > 0 && ccw342 > 0) || (ccw341 < 0 && ccw342 < 0)) {
    return false;
  }

  return true;
}

function getRoots(roots, node) {
  if (roots[node] === node) {
    return roots[node];
  }
  roots[node] = getRoots(roots, roots[node]);
  return roots[node];
}

function solution(n, rows) {
  const roots = [...new Array(n)].map((_, i) => i);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (meet(rows[i], rows[j])) {
        const root = getRoots(roots, j);
        roots[root] = getRoots(roots, i);
      }
    }
  }

  const result = new Map();
  let max = 0;
  for (let i = 0; i < n; i++) {
    const root = getRoots(roots, i);
    const count = (result.get(root) ?? 0) + 1;
    if (max < count) {
      max = count;
    }
    result.set(root, count);
  }

  console.log(`${result.size}\n${max}`);
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
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += n;

  solution(n, rows);
}
