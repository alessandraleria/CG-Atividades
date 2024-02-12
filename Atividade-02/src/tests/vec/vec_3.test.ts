import { Vec3, dot, cross } from "../../vec/vec_3";

describe("Vec3", () => {
  test("negate", () => {
    const v = new Vec3(1, 2, 3);
    const result = v.negate();
    expect(result).toEqual(new Vec3(-1, -2, -3));
  });

  test("add", () => {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(4, 5, 6);
    const result = v1.add(v2);
    expect(result).toEqual(new Vec3(5, 7, 9));
  });

  test("scale", () => {
    const v = new Vec3(1, 2, 3);
    const result = v.scale(2);
    expect(result).toEqual(new Vec3(2, 4, 6));
  });

  test("divide", () => {
    const v = new Vec3(2, 4, 6);
    const result = v.divide(2);
    expect(result).toEqual(new Vec3(1, 2, 3));
  });

  test("length", () => {
    const v = new Vec3(3, 4, 0);
    const result = v.length();
    expect(result).toBe(5);
  });

  test("lengthSquared", () => {
    const v = new Vec3(3, 4, 0);
    const result = v.lengthSquared();
    expect(result).toBe(25);
  });
});

describe("dot", () => {
  test("dot product", () => {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(4, 5, 6);
    const result = dot(v1, v2);
    expect(result).toBe(32);
  });
});

describe("cross", () => {
  test("cross product", () => {
    const v1 = new Vec3(1, 2, 3);
    const v2 = new Vec3(4, 5, 6);
    const result = cross(v1, v2);
    expect(result).toEqual(new Vec3(-3, 6, -3));
  });
});
