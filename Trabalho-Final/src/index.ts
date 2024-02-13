import Sphere from './utils/shapes/sphere';
import { Triangle } from './utils/shapes/triangle';
import Camera from './utils/camera';
import { HittableList } from './utils/hittable/hit_anything';
import { DiffuseMaterial } from './utils/diffuse_material';
import { Point3 } from './utils/point/point_3';
import { ObjLoader, ObjModel } from './utils/obj_loader';
import { Vec3 } from './utils/vec/vec_3';
import fs from 'fs';

function objToTriangles(
  model: ObjModel,
  translation: Point3 = new Point3(0, 0, 0),
  resize: number = 1,
): Array<Triangle> {
  const triangles = [];
  for (const face of model.faces) {
    const vertices = face.vertices.map((vertex) => model.vertices[vertex.vertexIndex - 1]);
    const verticesNormals = face.vertices.map((vertex) => model.vertexNormals[vertex.vertexNormalIndex - 1]);

    const validVertices = vertices.map(
      (vtx) =>
        new Vec3(
          (vtx.x + translation?.x) * resize,
          (vtx.y + translation?.y) * resize,
          (vtx.z + translation?.z) * resize,
        ),
    );

    let validVerticesNormals = undefined;
    if (!verticesNormals.every((vtx) => vtx === undefined))
      validVerticesNormals = verticesNormals.map((vtx) => new Vec3(vtx.x, vtx.y, vtx.z));

    const triangle = new Triangle(
      validVertices[0],
      validVertices[1],
      validVertices[2],
      new DiffuseMaterial(new Vec3(0.7, 0.3, 0.3)),
      validVerticesNormals,
    );

    triangles.push(triangle);
  }
  return triangles;
}

function readObject(objFilePath: string): ObjModel {
  const data = fs.readFileSync(objFilePath, 'utf-8');
  const parser = new ObjLoader(data);
  return parser.parse().models[0];
}

export function main() {
  const world = new HittableList();

  const model = readObject('src/assets/cube.obj');

  const translate = new Point3(-0.3, -2.8, 0);
  objToTriangles(model, translate, 0.8).forEach((shapes) => {
    world.add(shapes);
  });

  world.add(new Sphere(new Point3(-3, 0, -3), 0.5, new DiffuseMaterial(new Vec3(0.5, 0.5, 1))));
  world.add(new Sphere(new Point3(1.5, 0, 1.5), 0.5, new DiffuseMaterial(new Vec3(1, 0.5, 0.5))));

  world.add(new Sphere(new Point3(0, -100.5, -1), 100, new DiffuseMaterial(new Vec3(0.5, 1, 0.5))));

  const cam = new Camera();

  cam.aspectRatio = 16.0 / 9.0;
  cam.imageWidth = 400;
  cam.samplesPerPixel = 100;
  cam.maxDepth = 10;
  cam.vFov = 40;
  cam.lookFrom = new Point3(0.4, 2, 5);
  cam.lookAt = new Point3(0, 0, -1);
  cam.vup = new Vec3(0, 1, 0);

  cam.render('world-first-position', world);
  cam.lookFrom = new Point3(3, 2, 5);

  cam.render('world-second-position', world);
}

main();