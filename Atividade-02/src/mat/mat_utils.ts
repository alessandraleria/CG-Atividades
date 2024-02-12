export abstract class MatUtils {
  protected e: number[][];

  constructor(rows: number, cols: number, ...elements: number[]) {
    this.e = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.e[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        this.e[i][j] = elements[i * cols + j];
      }
    }
  }

  get(row: number, col: number): number {
    return this.e[row][col];
  }

  set(row: number, col: number, value: number): void {
    this.e[row][col] = value;
  }

  abstract add(m: MatUtils): MatUtils;

  abstract subtract(m: MatUtils): MatUtils;

  abstract multiply(m: MatUtils): MatUtils;

  abstract scalarMultiply(scalar: number): MatUtils;

  abstract scalarDivide(scalar: number): MatUtils;
}
