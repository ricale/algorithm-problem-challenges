function solution(n, m, rows) {
  const connections = [...new Array(n + 1)].map(() =>
    new Array(n + 1).fill(Infinity)
  );
  const routes = [...new Array(n + 1)].map(() =>
    [...new Array(n + 1)].map(() => [])
  );

  for (const [a, b, c] of rows) {
    if (connections[a][b] > c) {
      connections[a][b] = c;
      routes[a][b] = [a, b];
    }
  }
  for (let i = 1; i <= n; i++) {
    connections[i][i] = 0;
    routes[i][i].push(0);
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        const indirect = connections[j][i] + connections[i][k];
        if (connections[j][k] > indirect) {
          connections[j][k] = indirect;
          routes[j][k] = [...routes[j][i], ...routes[i][k].slice(1)];
        }
      }
    }
  }

  console.log(
    connections
      .slice(1)
      .map((row) =>
        row
          .slice(1)
          .map((item) => (item === Infinity ? 0 : item))
          .join(" ")
      )
      .join("\n")
  );

  console.log(
    routes
      .slice(1)
      .map((row) =>
        row
          .slice(1)
          .map((item) =>
            item.length === 1 ? item[0] : `${item.length} ${item.join(" ")}`
          )
          .join("\n")
      )
      .join("\n")
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
  const m = +cases[idx++];
  const rows = cases.slice(idx, idx + m).map((item) => {
    return item
      .trim()
      .split(" ")
      .map((it) => +it);
  });
  idx += m;

  solution(n, m, rows);
}
