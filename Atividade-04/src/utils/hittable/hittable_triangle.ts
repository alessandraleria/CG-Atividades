import { Vec3, dot, cross } from "../vec/vec_3";
import Hittable from "./hittable";
import { RayT } from "../ray";

export default class HittableTriangle extends Hittable {
  public v0: Vec3;
  public v1: Vec3;
  public v2: Vec3;

  constructor(v0: Vec3, v1: Vec3, v2: Vec3) {
    super();
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
  }

  hit(r: RayT): boolean {
    const v0_v1: Vec3 = this.v1.sub(this.v0);
    const v0_v2: Vec3 = this.v2.sub(this.v0);
    const vNormal: Vec3 = cross(v0_v1, v0_v2);
    
    const v0_origin: Vec3 = this.v0.sub(r.origin);
    const trianglePlan: number = dot(v0_origin, vNormal) / dot(r.direction, vNormal);

    if (trianglePlan < 0) { 
      return false;
    }

    const intersecPoint: Vec3 = r.at(trianglePlan);

    const v0_intersecPoint: Vec3 = intersecPoint.sub(this.v0);
    const crossProd_v0_v1: Vec3 = cross(v0_v1, v0_intersecPoint);

    if (dot(vNormal, crossProd_v0_v1) < 0) {
      return false;
    }

    const v1_v2: Vec3 = this.v2.sub(this.v1);
    const v1_intersecPoint: Vec3 = intersecPoint.sub(this.v1);
    const crossProd_v1_v2: Vec3 = cross(v1_v2, v1_intersecPoint);

    if (dot(vNormal, crossProd_v1_v2) < 0) {
      return false;
    } 

    const v2_v0: Vec3 = this.v0.sub(this.v2);
    const v2_intersecPoint: Vec3 = intersecPoint.sub(this.v2);
    const crossProd_v2_v0: Vec3 = cross(v2_v0, v2_intersecPoint);

    if (dot(vNormal, crossProd_v2_v0) < 0) {
      return false;
    }

    return true;

  }

}