import { Mat2 } from "../../mat/mat_2";

describe("Mat2", () => {
  // Teste para o método add
  test("Matrix addition", () => {
    const m1 = new Mat2(1, 2, 3, 4);
    const m2 = new Mat2(5, 6, 7, 8);
    const result = m1.add(m2);

    // Esperamos que cada elemento seja somado corretamente
    expect(result.get(0, 0)).toBe(6);
    expect(result.get(0, 1)).toBe(8);
    expect(result.get(1, 0)).toBe(10);
    expect(result.get(1, 1)).toBe(12);
  });

  // Teste para o método subtract
  test("Matrix subtraction", () => {
    const m1 = new Mat2(1, 2, 3, 4);
    const m2 = new Mat2(5, 6, 7, 8);
    const result = m1.subtract(m2);

    // Esperamos que cada elemento seja subtraído corretamente
    expect(result.get(0, 0)).toBe(-4);
    expect(result.get(0, 1)).toBe(-4);
    expect(result.get(1, 0)).toBe(-4);
    expect(result.get(1, 1)).toBe(-4);
  });

  // Teste para o método multiply
  test("Matrix multiplication", () => {
    const m1 = new Mat2(1, 2, 3, 4);
    const m2 = new Mat2(5, 6, 7, 8);
    const result = m1.multiply(m2);

    // Esperamos que a multiplicação da matriz seja feita corretamente
    expect(result.get(0, 0)).toBe(19);
    expect(result.get(0, 1)).toBe(22);
    expect(result.get(1, 0)).toBe(43);
    expect(result.get(1, 1)).toBe(50);
  });

  // Teste para o método scalarMultiply
  test("Scalar multiplication", () => {
    const m = new Mat2(1, 2, 3, 4);
    const scalar = 2;
    const result = m.scalarMultiply(scalar);

    // Esperamos que cada elemento seja multiplicado pelo escalar corretamente
    expect(result.get(0, 0)).toBe(2);
    expect(result.get(0, 1)).toBe(4);
    expect(result.get(1, 0)).toBe(6);
    expect(result.get(1, 1)).toBe(8);
  });

  // Teste para o método scalarDivide
  test("Scalar division of matrix", () => {
    const m = new Mat2(2, 4, 6, 8);
    const scalar = 2;
    const result = m.scalarDivide(scalar);

    // Esperamos que cada elemento seja dividido pelo escalar corretamente
    expect(result.get(0, 0)).toBe(1);
    expect(result.get(0, 1)).toBe(2);
    expect(result.get(1, 0)).toBe(3);
    expect(result.get(1, 1)).toBe(4);
  });

  // Teste para verificar divisão por zero
  test("Scalar division by zero", () => {
    const m = new Mat2(1, 2, 3, 4);
    const scalar = 0;

    // Esperamos que a divisão por zero resulte em um erro
    expect(() => m.scalarDivide(scalar)).toThrowError('Divisão por zero não permitida!');
  });
});
