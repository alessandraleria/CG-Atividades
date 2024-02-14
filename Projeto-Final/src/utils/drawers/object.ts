import writeColor, { Color } from "../Color";
import { RayT } from "../ray";
import { Vec3, unit } from "../vec/vec_3";
import HittableTriangle from "../hittable/hittable_triangle";
import { ObjLoader, ObjModel } from "../obj_loader";
import * as path from 'path';
import * as fs from 'fs';


function hitObject(obj: ObjModel, r: RayT): boolean {
  for (const face of obj.faces) {
    if (face.vertices.length < 3) {
      continue;
    }

    const validVertices = face.vertices.map((vertex) => {
      const vertexIndex = vertex.vertexIndex - 1;
      if (vertexIndex < 0 || vertexIndex >= obj.vertices.length) {
        return new Vec3(0, 0, 0);
      }
      return new Vec3(obj.vertices[vertexIndex].x, obj.vertices[vertexIndex].y, obj.vertices[vertexIndex].z);
    });

    if (new HittableTriangle(validVertices[0], validVertices[1], validVertices[2]).hit(r)) {
      return true;
    }
  }
  return false;
}


function rayColor(r: RayT, objFile: ObjModel): Color {
  if (hitObject(objFile, r)) {
    return new Vec3(1, 0, 0);
  }

  const unitDirection: Vec3 = unit(r.direction);
  const a: number = 0.5 * (unitDirection.y + 1.0);

  const w = new Vec3(1.0, 1.0, 1.0);
  const b = new Vec3(0.5, 0.7, 1.0);

  return w.scale(1.0 - a).add(b.scale(a));

}

export default function drawObject() {

  const aspectRatio: number = 16.0 / 9.0;
  const imageWidth: number = 400;
  let imageHeight = Math.floor(imageWidth / aspectRatio);
  imageHeight = imageHeight < 1 ? 1 : imageHeight;

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

  const filePath = path.resolve(__dirname, '../../assets/duck.obj');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const objLoader = new ObjLoader(fileContents);
  const parsedObj = objLoader.parse();

  let result = `P3\n${imageWidth} ${imageHeight}\n255\n`;

  for(let j = 0; j < imageHeight; j++) {
    for( let i = 0; i < imageWidth; i++) {
      const pixelCenter: Vec3 = pixel00Loc.add(pixelDeltaU.scale(i)).add(pixelDeltaV.scale(j));
      const rayTDirection: Vec3 = pixelCenter.sub(cameraCenter);
      const r: RayT = new RayT(cameraCenter, rayTDirection);

      const pixelColor: Vec3 = rayColor(r, parsedObj.models[0]);
      result += writeColor(pixelColor);
    }
  }
  console.log("Done Object\n");
  return result;
}