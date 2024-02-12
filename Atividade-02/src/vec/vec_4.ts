import { VecUtils } from "./vec_utils";

export class Vec4 extends VecUtils {
  constructor(e0: number, e1: number, e2: number, e3: number) {
    super(e0, e1, e2, e3);
  }

  get x(): number {
    return this.get(0);
  }

  get y(): number {
    return this.get(1);
  }

  get z(): number {
    return this.get(2);
  }

  get w(): number {
    return this.get(3);
  }

  negate(): Vec4 {
    return new Vec4(-this.x, -this.y, -this.z, -this.w);
  }

  add(v: Vec4): Vec4 {
    return new Vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
  }

  scale(n: number): Vec4 {
    return new Vec4(this.x * n, this.y * n, this.z * n, this.w * n);
  }

  divide(n: number): Vec4 {
    return this.scale(1 / n);
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
}

export function dot(u: Vec4, v: Vec4): number {
  return u.x * v.x + u.y * v.y + u.z * v.z + u.w * v.w;
}

export function unitVector(v: Vec4): Vec4 {
  return v.divide(v.length());
}