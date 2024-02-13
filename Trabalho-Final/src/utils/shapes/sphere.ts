import { Interval } from 'src/utils/interval';
import { Hittable, HitRecord } from '../hittable/hittable';
import { Point3 } from 'src/utils/point/point_3';
import { RayT } from 'src/utils/ray';
import { Vec3, dot } from '../vec/vec_3';
import { Material } from 'src/utils/material';

export default class Sphere implements Hittable {
  private center: Point3;
  private radius: number;
  private mat: Material;

  constructor(center: Point3, radius: number, material: Material) {
    this.center = center;
    this.radius = radius;
    this.mat = material;
  }

  hit(r: RayT, rayT: Interval): { objectHit: boolean; rec: HitRecord | null } {
    const oc: Vec3 = r.origin.sub(this.center);
    const a: number = r.direction.lengthSquared();
    const halfB: number = dot(oc, r.direction);
    const c: number = oc.lengthSquared() - this.radius * this.radius;

    const discriminant: number = halfB * halfB - a * c;
    if (discriminant < 0) return { objectHit: false, rec: null };
    const sqrtd: number = Math.sqrt(discriminant);

    let root: number = (-halfB - sqrtd) / a;
    if (!rayT.surrounds(root)) {
      root = (-halfB + sqrtd) / a;
      if (!rayT.surrounds(root)) return { objectHit: false, rec: null };
    }

    const rec = new HitRecord();
    rec.t = root;
    rec.p = r.at(rec.t);
    const outwardNormal = rec.p.sub(this.center).divide(this.radius);
    rec.setFaceNormal(r, outwardNormal);
    rec.mat = this.mat;

    return { objectHit: true, rec };
  }
}