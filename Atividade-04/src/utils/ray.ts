import { Vec3 } from "./vec/vec_3";
import { Point3 } from "./point/point_3";

export class RayT {
  originPoint: Point3;
  directionVec: Vec3;

  constructor(origin: Point3, direction: Vec3) {
    this.originPoint = origin;
    this.directionVec = direction;
  }

  get origin(): Point3 {
    return this.originPoint;
  }

  get direction(): Vec3 {
    return this.directionVec;
  }

  at(t: number): Point3 {
    return this.originPoint.add(this.directionVec.scale(t));
  }

}