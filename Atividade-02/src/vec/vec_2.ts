import { VecUtils } from "./vec_utils";

export class Vec2 extends VecUtils {
  constructor(e0: number, e1: number) {
    super(e0, e1);
  }

  get x(): number {
    return this.get(0);
  }

  get y(): number {
    return this.get(1);
  }

  negate(): Vec2 {
    return new Vec2(-this.x, -this.y);
  }

  add(v: Vec2): Vec2 {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  scale(t: number): Vec2 {
    return new Vec2(this.x * t, this.y * t);
  }

  divide(t: number): Vec2 {
    return this.scale(1 / t);
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }
}

export function dot(u: Vec2, v: Vec2): number {
  return u.x * v.x + u.y * v.y;
}

export function unitVector(v: Vec2): Vec2 {
  const length = v.length();
  if (length === 0) {
    return new Vec2(0, 0); // Valida divisão por 0
  }
  return v.divide(length);
}
