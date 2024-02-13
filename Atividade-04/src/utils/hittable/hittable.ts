import { RayT } from "../ray";

export default abstract class Hittable {

  abstract hit(r: RayT): boolean;
}