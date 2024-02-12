import { Mat3 } from '../../mat/mat_3';

describe('Mat3', () => {
  test('Matrix addition', () => {
    const m1 = new Mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const m2 = new Mat3(9, 8, 7, 6, 5, 4, 3, 2, 1);

    const result = m1.add(m2);

    expect(result.get(0, 0)).toBe(10);
    expect(result.get(0, 1)).toBe(10);
    expect(result.get(0, 2)).toBe(10);
    expect(result.get(1, 0)).toBe(10);
    expect(result.get(1, 1)).toBe(10);
    expect(result.get(1, 2)).toBe(10);
    expect(result.get(2, 0)).toBe(10);
    expect(result.get(2, 1)).toBe(10);
    expect(result.get(2, 2)).toBe(10);
  });

  test('Matrix subtraction', () => {
    const m1 = new Mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const m2 = new Mat3(9, 8, 7, 6, 5, 4, 3, 2, 1);

    const result = m1.subtract(m2);

    expect(result.get(0, 0)).toBe(-8);
    expect(result.get(0, 1)).toBe(-6);
    expect(result.get(0, 2)).toBe(-4);
    expect(result.get(1, 0)).toBe(-2);
    expect(result.get(1, 1)).toBe(0);
    expect(result.get(1, 2)).toBe(2);
    expect(result.get(2, 0)).toBe(4);
    expect(result.get(2, 1)).toBe(6);
    expect(result.get(2, 2)).toBe(8);
  });

  test('Matrix multiplication', () => {
    const m1 = new Mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const m2 = new Mat3(9, 8, 7, 6, 5, 4, 3, 2, 1);

    const result = m1.multiply(m2);

    expect(result.get(0, 0)).toBe(30);
    expect(result.get(0, 1)).toBe(24);
    expect(result.get(0, 2)).toBe(18);
    expect(result.get(1, 0)).toBe(84);
    expect(result.get(1, 1)).toBe(69);
    expect(result.get(1, 2)).toBe(54);
    expect(result.get(2, 0)).toBe(138);
    expect(result.get(2, 1)).toBe(114);
    expect(result.get(2, 2)).toBe(90);
  });

  test('Scalar multiplication', () => {
    const m = new Mat3(1, 2, 3, 4, 5, 6, 7, 8, 9);
    const scalar = 2;

    const result = m.scalarMultiply(scalar);

    expect(result.get(0, 0)).toBe(2);
    expect(result.get(0, 1)).toBe(4);
    expect(result.get(0, 2)).toBe(6);
    expect(result.get(1, 0)).toBe(8);
    expect(result.get(1, 1)).toBe(10);
    expect(result.get(1, 2)).toBe(12);
    expect(result.get(2, 0)).toBe(14);
    expect(result.get(2, 1)).toBe(16);
    expect(result.get(2, 2)).toBe(18);
  });

  test('Scalar division', () => {
    const m = new Mat3(2, 4, 6, 8, 10, 12, 14, 16, 18);
    const scalar = 2;

    const result = m.scalarDivide(scalar);

    expect(result.get(0, 0)).toBe(1);
    expect(result.get(0, 1)).toBe(2);
    expect(result.get(0, 2)).toBe(3);
    expect(result.get(1, 0)).toBe(4);
    expect(result.get(1, 1)).toBe(5);
    expect(result.get(1, 2)).toBe(6);
    expect(result.get(2, 0)).toBe(7);
    expect(result.get(2, 1)).toBe(8);
    expect(result.get(2, 2)).toBe(9);
  });
});
