import fs from "fs";
import writeColor from "./utils/Color";
import { Vec3 } from "./vec/vec_3";

function main() {
  const imageWidth = 256;
  const imageHeight = 256;

  const writer = fs.createWriteStream("src/out/image.ppm");

  writer.write(`P3\n${imageWidth} ${imageHeight}\n255\n`);

  for (let j = 0; j < imageHeight; ++j) {
    for (let i = 0; i < imageWidth; ++i) {
      const pixelColor = new Vec3(
        i / (imageWidth - 1),
        j / (imageHeight - 1),
        0
      );
      writeColor(writer, pixelColor);
    }
  }
}

main();
