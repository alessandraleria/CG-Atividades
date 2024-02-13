import { Interval } from "../interval";
import { Material } from "../material";
import { Point3 } from "../point/point_3";
import { RayT } from "../ray";
import { Vec3, dot } from "../vec/vec_3";

export class HitRecord {

  p!: Point3;
  normal!: Vec3;
  mat!: Material;
  t!: number;
  frontFace!: boolean;

  public setFaceNormal(r: RayT, outwardNormal: Vec3): void {
    this.frontFace = dot(r.direction, outwardNormal) < 0;
    this.normal = this.frontFace ? outwardNormal : outwardNormal.negate();
  }
}

export abstract class Hittable {
  abstract hit(r: RayT, rayT: Interval): { objectHit: boolean; rec: HitRecord | null };
}