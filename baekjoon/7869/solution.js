function solution(x1, y1, r1, x2, y2, r2) {
  const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  if (dist >= r1 + r2) {
    console.log((0).toFixed(3));
    return;
  }

  if (dist <= Math.abs(r2 - r1)) {
    const minRadius = Math.min(r1, r2);
    console.log((Math.PI * Math.pow(minRadius, 2)).toFixed(3));
    return;
  }

  // 제2코사인법칙
  const radian1 =
    2 * Math.acos((r1 * r1 + dist * dist - r2 * r2) / (2 * r1 * dist));
  const radian2 =
    2 * Math.acos((r2 * r2 + dist * dist - r1 * r1) / (2 * r2 * dist));
  const degree1 = (radian1 * (180 / Math.PI)) / 360;
  const degree2 = (radian2 * (180 / Math.PI)) / 360;

  const sector1 = Math.PI * r1 * r1 * degree1;
  const triangle1 = (r1 * r1 * Math.sin(radian1)) / 2;
  const sector2 = Math.PI * r2 * r2 * degree2;
  const triangle2 = (r2 * r2 * Math.sin(radian2)) / 2;

  const withoutTriangle1 = sector1 - triangle1;
  const withoutTriangle2 = sector2 - triangle2;
  console.log((withoutTriangle1 + withoutTriangle2).toFixed(3));
}

//////
////
// input

const fs = require("fs");
const isLocal = process.platform !== "linux";
const filePath = isLocal ? "./input.txt" : "/dev/stdin";
const input = fs.readFileSync(filePath).toString().trim();

if (isLocal) {
  const cases = input.split("\n").filter((item) => !!item);

  cases.forEach((item) => {
    solution(
      ...item
        .trim()
        .split(" ")
        .map((it) => +it)
    );
  });
} else {
  solution(
    ...input
      .trim()
      .split(" ")
      .map((it) => +it)
  );
}
