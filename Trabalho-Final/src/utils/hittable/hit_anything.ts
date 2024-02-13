import { HitRecord, Hittable } from './hittable';
import { Interval } from '../interval';
import { RayT } from '../ray';

export class HittableList implements Hittable {
  
  objects: Hittable[];

  constructor() {
    this.objects = [];
  }

  add(object: Hittable): void {
    this.objects.push(object);
  }

  clear(): void {
    this.objects = [];
  }

  hit(r: RayT, rayT: Interval): { objectHit: boolean; rec: HitRecord | null } {
    let hitAnything: boolean = false;
    let closestSoFar: number = rayT.max;
    let hitRecord: HitRecord;

    for (const object of this.objects) {
      const { objectHit, rec } = object.hit(r, new Interval(rayT.min, closestSoFar));
      if (objectHit) {
        hitAnything = true;
        closestSoFar = rec!.t;
        hitRecord = rec!;
      }
    }

    if (hitAnything) return { objectHit: true, rec: hitRecord! };
    else return { objectHit: false, rec: null };
  }
}