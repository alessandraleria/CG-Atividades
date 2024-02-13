import { Vec3, dot } from "../vec/vec_3";
import Hittable from "./hittable";
import { RayT } from "../ray";

export default class HittableSphere extends Hittable {
  private center: Vec3;
  private radius: number;

  constructor(center: Vec3, radius: number) {
    super();
    this.center = center;
    this.radius = radius;
  }

  hit(r: RayT): boolean {
    const origin_center: Vec3 = r.origin.sub(this.center);

    const a: number = dot(r.direction, r.direction);
    const b: number = 2.0 * dot(origin_center, r.direction);
    const c: number = dot(origin_center, origin_center) - this.radius * this.radius;

    const discriminant: number = b * b - 4 * a * c;
    return discriminant >= 0;
  }
}