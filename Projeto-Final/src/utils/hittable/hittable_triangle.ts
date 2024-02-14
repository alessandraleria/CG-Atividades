import { Vec3, dot, cross, unit } from "../vec/vec_3";
import Hittable from "./hittable";
import { RayT } from "../ray";

export default class HittableTriangle extends Hittable {
  public v0: Vec3;
  public v1: Vec3;
  public v2: Vec3;
  public color: Vec3;
  public refractiveIndex: number;
  public isReflective: boolean;

  constructor(v0: Vec3, v1: Vec3, v2: Vec3, color: Vec3, refractiveIndex: number = 1.0, isReflective = false) {
    super();
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
    this.color = color;
    this.refractiveIndex = refractiveIndex;
    this.isReflective = isReflective;
  }

  getNormal(): Vec3 {
    const e1: Vec3 = this.v1.sub(this.v0);
    const e2: Vec3 = this.v2.sub(this.v0);
  
    const normal: Vec3 = cross(e1, e2);
    
    return unit(normal);
  }

  getPoint(u: number, v: number): Vec3 {
    const w: number = 1 - u - v;
    const x: number = w * this.v0.x + u * this.v1.x + v * this.v2.x;
    const y: number = w * this.v0.y + u * this.v1.y + v * this.v2.y;
    const z: number = w * this.v0.z + u * this.v1.z + v * this.v2.z;

    return new Vec3(x, y, z);
  }

  getIsReflective(): boolean {
    return this.isReflective;
  }

  reflect(vector: Vec3, normal: Vec3): Vec3 {
    return vector.sub(normal.scale(2 * dot(vector, normal)));
  }

  hit(r: RayT): number | null {
    const v0_v1: Vec3 = this.v1.sub(this.v0);
    const v0_v2: Vec3 = this.v2.sub(this.v0);
    const pvec: Vec3 = cross(r.direction, v0_v2);
    const det: number = dot(v0_v1, pvec);
  
    // Se o determinante é próximo de zero, o raio está no plano do triângulo
    if (Math.abs(det) < 1e-8) {
      return null;
    }
  
    const invDet: number = 1 / det;
    const tvec: Vec3 = r.origin.sub(this.v0);
    const u: number = dot(tvec, pvec) * invDet;
  
    if (u < 0 || u > 1) {
      return null;
    }
  
    const qvec: Vec3 = cross(tvec, v0_v1);
    const v: number = dot(r.direction, qvec) * invDet;
  
    if (v < 0 || u + v > 1) {
      return null;
    }
  
    const t: number = dot(v0_v2, qvec) * invDet;
  
    return t >= 0 ? t : null;
  }

  getColor(): Vec3 { // Adicione este método para obter a cor
    return this.color;
  } 

}