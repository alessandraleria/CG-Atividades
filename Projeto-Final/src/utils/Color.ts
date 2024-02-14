import { Vec3 } from "./vec/vec_3";

export type Color = Vec3;

export default function writeColor(pixelColor: Color): string {
  const red = Math.round(255 * Math.max(0, Math.min(1, pixelColor.x)));
  const green = Math.round(255 * Math.max(0, Math.min(1, pixelColor.y)));
  const blue = Math.round(255 * Math.max(0, Math.min(1, pixelColor.z)));

  return`${red} ${green} ${blue}\n`;
}