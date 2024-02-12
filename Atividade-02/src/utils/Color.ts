import { Vec3 } from "../vec/vec_3";
import { WriteStream } from "fs";

export type Color = Vec3;

export default function writeColor(out: WriteStream, pixelColor: Color): void {
  const red = Math.floor(255.999 * pixelColor.x);
  const green = Math.floor(255.999 * pixelColor.y);
  const blue = Math.floor(255.999 * pixelColor.z);

  out.write(`${red} ${green} ${blue}\n`);
}