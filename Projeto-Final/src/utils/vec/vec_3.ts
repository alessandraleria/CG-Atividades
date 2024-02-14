import { VecUtils } from "./vec_utils";

export class Vec3 extends VecUtils {
  constructor(e0: number, e1: number, e2: number) {
    super(e0, e1, e2);
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

  negate(): Vec3 {
    return new Vec3(-this.x, -this.y, -this.z);
  }

  add(v: Vec3): Vec3 {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v: Vec3): Vec3 {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  scale(n: number): Vec3 {
    return new Vec3(this.x * n, this.y * n, this.z * n);
  }

  divide(n: number): Vec3 {
    return this.scale(1 / n);
  }

  length(): number {
    return Math.sqrt(this.lengthSquared());
  }

  lengthSquared(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
}

export function dot(u: Vec3, v: Vec3): number {
  return u.x * v.x + u.y * v.y + u.z * v.z;
}

export function cross(u: Vec3, v: Vec3): Vec3 {
  return new Vec3(
    u.y * v.z - u.z * v.y,
    u.z * v.x - u.x * v.z,
    u.x * v.y - u.y * v.x
  );
}

export function unit(v: Vec3): Vec3 {
  return v.divide(v.length());
}
