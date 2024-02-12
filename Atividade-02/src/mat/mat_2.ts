import { MatUtils } from "./mat_utils";

export class Mat2 extends MatUtils {
  constructor(e00: number, e01: number, e10: number, e11: number) {
    super(e00, e01, e10, e11);
  }

  add(m: Mat2): Mat2 {
    return new Mat2(
      this.get(0, 0) + m.get(0, 0),
      this.get(0, 1) + m.get(0, 1),
      this.get(1, 0) + m.get(1, 0),
      this.get(1, 1) + m.get(1, 1)
    );
  }

  subtract(m: Mat2): Mat2 {
    return new Mat2(
      this.get(0, 0) - m.get(0, 0),
      this.get(0, 1) - m.get(0, 1),
      this.get(1, 0) - m.get(1, 0),
      this.get(1, 1) - m.get(1, 1)
    );
  }

  multiply(m: Mat2): Mat2 {
    return new Mat2(
      this.get(0, 0) * m.get(0, 0) + this.get(0, 1) * m.get(1, 0),
      this.get(0, 0) * m.get(0, 1) + this.get(0, 1) * m.get(1, 1),
      this.get(1, 0) * m.get(0, 0) + this.get(1, 1) * m.get(1, 0),
      this.get(1, 0) * m.get(0, 1) + this.get(1, 1) * m.get(1, 1)
    );
  }

  scalarMultiply(scalar: number): Mat2 {
    return new Mat2(
      this.get(0, 0) * scalar,
      this.get(0, 1) * scalar,
      this.get(1, 0) * scalar,
      this.get(1, 1) * scalar
    );
  }

  scalarDivide(scalar: number): Mat2 {
    if (scalar === 0) {
      throw new Error('Divisão por zero não permitida!');
    }

    return this.scalarMultiply(1 / scalar);
  }
}
