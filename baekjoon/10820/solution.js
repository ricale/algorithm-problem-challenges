function solution(rows) {
  console.log(
    rows
      .map((line) =>
        line
          .split("")
          .reduce(
            (acc, char) => {
              const code = char.charCodeAt();
              if ("a".charCodeAt() <= code && code <= "z".charCodeAt()) {
                acc[0] += 1;
              } else if ("A".charCodeAt() <= code && code <= "Z".charCodeAt()) {
                acc[1] += 1;
              } else if (char === " ") {
                acc[3] += 1;
              } else {
                acc[2] += 1;
              }
              return acc;
            },
            [0, 0, 0, 0]
          )
          .join(" ")
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
const input = fs.readFileSync(filePath).toString();

const rows = input.split("\n").filter((item) => !!item);
solution(rows);
