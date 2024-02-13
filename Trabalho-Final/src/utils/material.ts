import { Color } from './Color';
import { HitRecord } from './hittable/hittable';
import { RayT } from './ray';

export abstract class Material {
  abstract scatter(rIn: RayT, rec: HitRecord): { isScatter: boolean; scattered: RayT; attenuation: Color };
}