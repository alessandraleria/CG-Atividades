const infinity: number = Number.POSITIVE_INFINITY;
const pi: number = 3.1415926535897932385;

function degreesToRadians(degrees: number): number {
  return degrees * (pi / 180.0);
}

function randomDouble(): number {
  return Math.random();
}

function randomDoubleRange(min: number, max: number): number {
  return min + (max - min) * Math.random();
}

export { infinity, pi, degreesToRadians, randomDouble, randomDoubleRange };