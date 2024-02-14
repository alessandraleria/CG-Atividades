import { Vec3 } from "./vec/vec_3";

export type Color = Vec3;

export default function writeColor(pixelColor: Color): string {
  const red = Math.floor(255.999 * pixelColor.x);
  const green = Math.floor(255.999 * pixelColor.y);
  const blue = Math.floor(255.999 * pixelColor.z);

  return`${red} ${green} ${blue}\n`;
}