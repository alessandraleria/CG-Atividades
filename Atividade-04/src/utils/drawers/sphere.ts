import writeColor, { Color } from "../Color";
import HittableSphere from "../hittable/hittable_sphere";
import { Point3 } from "../point/point_3";
import { RayT } from "../ray";
import { Vec3, unit } from "../vec/vec_3";

function rayColor(r: RayT): Color {
  const center: Point3 = new Vec3(0, 0, -1);
  const radius: number = 0.5;

  if (new HittableSphere(center, radius).hit(r)) {
    return new Vec3(1, 0, 0);
  }

  const unitDirection: Vec3 = unit(r.direction);
  const a: number = 0.5 * (unitDirection.y + 1.0);

  const w = new Vec3(1.0, 1.0, 1.0);
  const b = new Vec3(0.5, 0.7, 1.0);

  return w.scale(1.0 - a).add(b.scale(a));

}

export default function drawSphere() {

  const aspectRatio: number = 16.0 / 9.0;
  const imageWidth: number = 400;
  let imageHeight: number = Math.max(1, Math.floor(imageWidth / aspectRatio));

  const focalLength: number = 1.0;
  const viewportHeight: number = 2.0;
  const viewportWidth: number = viewportHeight * (imageWidth / imageHeight);
  const cameraCenter: Vec3 = new Vec3(0, 0, 0);

  const viewportU: Vec3 = new Vec3(viewportWidth, 0, 0);
  const viewportV: Vec3 = new Vec3(0, -viewportHeight, 0);

  const pixelDeltaU: Vec3 = viewportU.divide(imageWidth);
  const pixelDeltaV: Vec3 = viewportV.divide(imageHeight);

  const viewportUpperLeft: Vec3 = cameraCenter
    .sub(new Vec3(0, 0, focalLength))
    .sub(viewportU.divide(2))
    .sub(viewportV.divide(2));
  const pixel00Loc: Vec3 = viewportUpperLeft.add(pixelDeltaU.scale(0.5).add(pixelDeltaV.scale(0.5)));

  let result = `P3\n${imageWidth} ${imageHeight}\n255\n`;
  for(let j = 0; j < imageHeight; j++) {
    for( let i = 0; i < imageWidth; i++) {
      const pixelCenter: Vec3 = pixel00Loc.add(pixelDeltaU.scale(i)).add(pixelDeltaV.scale(j));
      const rayTDirection: Vec3 = pixelCenter.sub(cameraCenter);
      const r: RayT = new RayT(cameraCenter, rayTDirection);

      const pixelColor: Vec3 = rayColor(r);
      result += writeColor(pixelColor);
    }
  }
  console.log("Done Sphere\n");
  return result;
}