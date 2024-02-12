import { Vec2, dot, unitVector } from "../../vec/vec_2";

describe("Vec2 Tests", () => {
  test("Vec2 creation", () => {
    const v = new Vec2(1, 2);

    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
  });

  test("Vec2 addition", () => {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(3, 4);

    const result = v1.add(v2);

    expect(result.x).toBe(4);
    expect(result.y).toBe(6);
  });

  test("Vec2 scaling", () => {
    const v = new Vec2(2, 4);

    const result = v.scale(2);

    expect(result.x).toBe(4);
    expect(result.y).toBe(8);
  });

  test("Vec2 division", () => {
    const v = new Vec2(6, 8);

    const result = v.divide(2);

    expect(result.x).toBe(3);
    expect(result.y).toBe(4);
  });

  test("Vec2 length", () => {
    const v = new Vec2(3, 4);

    const result = v.length();

    expect(result).toBe(5);
  });

  test("Vec2 lengthSquared", () => {
    const v = new Vec2(3, 4);

    const result = v.lengthSquared();

    expect(result).toBe(25);
  });

  test("Vec2 dot product", () => {
    const v1 = new Vec2(1, 2);
    const v2 = new Vec2(3, 4);

    const result = dot(v1, v2);

    expect(result).toBe(11);
  });

  test("Vec2 unit vector", () => {
    const v = new Vec2(3, 4);

    const result = unitVector(v);

    expect(result.x).toBeCloseTo(0.6);
    expect(result.y).toBeCloseTo(0.8);
  });
});
