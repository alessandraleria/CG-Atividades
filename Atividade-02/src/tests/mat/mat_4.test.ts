import { Mat4 } from '../../mat/mat_4';

describe('Mat4', () => {
  test('Matrix addition', () => {
    const m1 = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const m2 = new Mat4(16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1);

    const result = m1.add(m2);

    expect(result.get(0, 0)).toBe(17);
    expect(result.get(0, 1)).toBe(17);
    expect(result.get(0, 2)).toBe(17);
    expect(result.get(0, 3)).toBe(17);
    expect(result.get(1, 0)).toBe(17);
    expect(result.get(1, 1)).toBe(17);
    expect(result.get(1, 2)).toBe(17);
    expect(result.get(1, 3)).toBe(17);
    expect(result.get(2, 0)).toBe(17);
    expect(result.get(2, 1)).toBe(17);
    expect(result.get(2, 2)).toBe(17);
    expect(result.get(2, 3)).toBe(17);
    expect(result.get(3, 0)).toBe(17);
    expect(result.get(3, 1)).toBe(17);
    expect(result.get(3, 2)).toBe(17);
    expect(result.get(3, 3)).toBe(17);
  });

  test('Matrix subtraction', () => {
    const m1 = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const m2 = new Mat4(16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1);

    const result = m1.subtract(m2);

    expect(result.get(0, 0)).toBe(-15);
    expect(result.get(0, 1)).toBe(-13);
    expect(result.get(0, 2)).toBe(-11);
    expect(result.get(0, 3)).toBe(-9);
    expect(result.get(1, 0)).toBe(-7);
    expect(result.get(1, 1)).toBe(-5);
    expect(result.get(1, 2)).toBe(-3);
    expect(result.get(1, 3)).toBe(-1);
    expect(result.get(2, 0)).toBe(1);
    expect(result.get(2, 1)).toBe(3);
    expect(result.get(2, 2)).toBe(5);
    expect(result.get(2, 3)).toBe(7);
    expect(result.get(3, 0)).toBe(9);
    expect(result.get(3, 1)).toBe(11);
    expect(result.get(3, 2)).toBe(13);
    expect(result.get(3, 3)).toBe(15);
  });

  test('Matrix multiplication', () => {
    const m1 = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const m2 = new Mat4(16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1);

    const result = m1.multiply(m2);

    expect(result.get(0, 0)).toBe(80);
    expect(result.get(0, 1)).toBe(70);
    expect(result.get(0, 2)).toBe(60);
    expect(result.get(0, 3)).toBe(50);
    expect(result.get(1, 0)).toBe(240);
    expect(result.get(1, 1)).toBe(214);
    expect(result.get(1, 2)).toBe(188);
    expect(result.get(1, 3)).toBe(162);
    expect(result.get(2, 0)).toBe(400);
    expect(result.get(2, 1)).toBe(358);
    expect(result.get(2, 2)).toBe(316);
    expect(result.get(2, 3)).toBe(274);
    expect(result.get(3, 0)).toBe(560);
    expect(result.get(3, 1)).toBe(502);
    expect(result.get(3, 2)).toBe(444);
    expect(result.get(3, 3)).toBe(386);
  });

  test('Scalar multiplication', () => {
    const m = new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const scalar = 2;

    const result = m.scalarMultiply(scalar);

    expect(result.get(0, 0)).toBe(2);
    expect(result.get(0, 1)).toBe(4);
    expect(result.get(0, 2)).toBe(6);
    expect(result.get(0, 3)).toBe(8);
    expect(result.get(1, 0)).toBe(10);
    expect(result.get(1, 1)).toBe(12);
    expect(result.get(1, 2)).toBe(14);
    expect(result.get(1, 3)).toBe(16);
    expect(result.get(2, 0)).toBe(18);
    expect(result.get(2, 1)).toBe(20);
    expect(result.get(2, 2)).toBe(22);
    expect(result.get(2, 3)).toBe(24);
    expect(result.get(3, 0)).toBe(26);
    expect(result.get(3, 1)).toBe(28);
    expect(result.get(3, 2)).toBe(30);
    expect(result.get(3, 3)).toBe(32);
  });

  test('Scalar division', () => {
    const m = new Mat4(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32);
    const scalar = 2;

    const result = m.scalarDivide(scalar);

    expect(result.get(0, 0)).toBe(1);
    expect(result.get(0, 1)).toBe(2);
    expect(result.get(0, 2)).toBe(3);
    expect(result.get(0, 3)).toBe(4);
    expect(result.get(1, 0)).toBe(5);
    expect(result.get(1, 1)).toBe(6);
    expect(result.get(1, 2)).toBe(7);
    expect(result.get(1, 3)).toBe(8);
    expect(result.get(2, 0)).toBe(9);
    expect(result.get(2, 1)).toBe(10);
    expect(result.get(2, 2)).toBe(11);
    expect(result.get(2, 3)).toBe(12);
    expect(result.get(3, 0)).toBe(13);
    expect(result.get(3, 1)).toBe(14);
    expect(result.get(3, 2)).toBe(15);
    expect(result.get(3, 3)).toBe(16);
  });
});
