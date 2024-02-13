import { randomUnitVector } from './vec/vec_3';
import { Color } from './Color';
import { Material } from './material';
import { RayT } from './ray';
import { HitRecord } from './hittable/hittable';

export class DiffuseMaterial implements Material {
  private albedo: Color;

  constructor(a: Color) {
    this.albedo = a;
  }

  scatter(_rIn: RayT, rec: HitRecord): { isScatter: boolean; scattered: RayT; attenuation: Color } {
    let scatterDirection = rec.normal.add(randomUnitVector());
    if (scatterDirection.nearZero()) {
      scatterDirection = rec.normal;
    }
    const scattered = new RayT(rec.p, scatterDirection);
    const attenuation = this.albedo;
    return { isScatter: true, scattered, attenuation };
  }
}