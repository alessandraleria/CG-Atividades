import { Vec4, dot, unitVector } from "../../vec/vec_4";

describe("Vec4", () => {
  test("negate", () => {
    const v = new Vec4(1, 2, 3, 4);
    const result = v.negate();
    expect(result).toEqual(new Vec4(-1, -2, -3, -4));
  });

  test("add", () => {
    const v1 = new Vec4(1, 2, 3, 4);
    const v2 = new Vec4(5, 6, 7, 8);
    const result = v1.add(v2);
    expect(result).toEqual(new Vec4(6, 8, 10, 12));
  });

  test("scale", () => {
    const v = new Vec4(1, 2, 3, 4);
    const result = v.scale(2);
    expect(result).toEqual(new Vec4(2, 4, 6, 8));
  });

  test("divide", () => {
    const v = new Vec4(2, 4, 6, 8);
    const result = v.divide(2);
    expect(result).toEqual(new Vec4(1, 2, 3, 4));
  });

  test("length", () => {
    const v = new Vec4(1, 2, 3, 4);
    const result = v.length();
    expect(result).toBe(Math.sqrt(30));
  });

  test("lengthSquared", () => {
    const v = new Vec4(1, 2, 3, 4);
    const result = v.lengthSquared();
    expect(result).toBe(30);
  });
});

describe("dot", () => {
  test("dot product", () => {
    const v1 = new Vec4(1, 2, 3, 4);
    const v2 = new Vec4(5, 6, 7, 8);
    const result = dot(v1, v2);
    expect(result).toBe(70);
  });
});

describe("unitVector", () => {
  test("unit vector", () => {
    const v = new Vec4(1, 2, 3, 4);
    const result = unitVector(v);
    expect(result.length()).toBeCloseTo(1, 10);
  });
});
