import { Vec3, dot } from "../vec/vec_3";
import Hittable from "./hittable";
import { RayT } from "../ray";

export default class HittableSphere extends Hittable {
  private center: Vec3;
  private radius: number;
  private color: Vec3;

  constructor(center: Vec3, radius: number, color: Vec3) {
    super();
    this.center = center;
    this.radius = radius;
    this.color = color;
  }

  // hit(r: RayT): boolean {
  //   const origin_center: Vec3 = r.origin.sub(this.center);

  //   const a: number = dot(r.direction, r.direction);
  //   const b: number = 2.0 * dot(origin_center, r.direction);
  //   const c: number = dot(origin_center, origin_center) - this.radius * this.radius;

  //   const discriminant: number = b * b - 4 * a * c;
  //   return discriminant >= 0;
  // }

  hit(r: RayT): number | null {
    const oc: Vec3 = r.origin.sub(this.center);
    const a: number = r.direction.lengthSquared();
    const half_b: number = dot(oc, r.direction);
    const c: number = oc.lengthSquared() - this.radius * this.radius;
    const discriminant: number = half_b * half_b - a * c;
  
    if (discriminant < 0) {
      return null;
    } else {
      return (-half_b - Math.sqrt(discriminant)) / a;
    }
  }

  getColor(): Vec3 { // Adicione este método para obter a cor
    return this.color;
  }
}