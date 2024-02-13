import { Vec3 } from "./vec/vec_3";
import { Interval } from "./interval";

export type Color = Vec3;

export default function writeColor(pixelColor: Color, samplesPerPixel: number): string {
  let red = Math.floor(255.999 * pixelColor.x);
  let green = Math.floor(255.999 * pixelColor.y);
  let blue = Math.floor(255.999 * pixelColor.z);

  const scale: number = 1.0 / samplesPerPixel;
  red *= scale;
  green *= scale;
  blue *= scale;

  red = linearToGamma(red);
  green = linearToGamma(green);
  blue = linearToGamma(blue);

  const intensityBounds = new Interval(0.0, 0.999);

  return (
    `${Math.floor(256 * intensityBounds.clamp(red))} ` +
    `${Math.floor(256 * intensityBounds.clamp(green))} ` +
    `${Math.floor(256 * intensityBounds.clamp(blue))}\n`
  );
}

function linearToGamma(linearComponent: number): number {
  return Math.sqrt(linearComponent);
}