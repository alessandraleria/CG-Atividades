import { Vec3, cross, unit } from './vec/vec_3';
import { Hittable } from './hittable/hittable';
import { Interval } from './interval';
import { Point3 } from './point/point_3';
import { RayT } from './ray';
import { degreesToRadians, infinity, randomDouble } from './utils';
import writeColor, { Color } from './Color';
import ImageGenerator from './generator';

export default class Camera {
  aspectRatio: number = 1.0; // Ratio of image width over height
  imageWidth: number = 100; // Rendered image width in pixel count
  samplesPerPixel: number = 10; // Count of random samples for each pixel
  maxDepth: number = 10; // Maximum number of ray bounces into scene
  vFov: number = 90; // Vertical view angle (field of view)
  lookFrom: Point3 = new Point3(0, 0, -1); // Point camera is looking from
  lookAt: Point3 = new Point3(0, 0, 0); // Point camera is looking at
  vup: Vec3 = new Vec3(0, 1, 0); // Camera-relative "up" direction

  private imageHeight!: number;
  private center!: Point3;
  private pixel00Loc!: Point3;
  private pixelDeltaU!: Vec3;
  private pixelDeltaV!: Vec3;
  private imageGenerator!: ImageGenerator;
  private u!: Vec3;
  private v!: Vec3;
  private w!: Vec3;

  render(filename: string, world: Hittable): void {
    this.initialize();

    let content = `P3\n${this.imageWidth} ${this.imageHeight}\n255\n`;

    for (let j = 0; j < this.imageHeight; ++j) {
      console.log(`\rScanlines remaining: ${this.imageHeight - j} `);
      for (let i = 0; i < this.imageWidth; ++i) {
        let pixelColor: Color = new Vec3(0, 0, 0);
        for (let sample = 0; sample < this.samplesPerPixel; ++sample) {
          const r: RayT = this.getRay(i, j);
          pixelColor = pixelColor.add(this.rayColor(r, this.maxDepth, world));
        }
        content += writeColor(pixelColor, this.samplesPerPixel);
      }
    }

    this.imageGenerator.generateImage(filename, content);
    console.log('\rDone.                 \n');
  }

  private initialize(): void {
    this.imageHeight = Math.max(1, Math.floor(this.imageWidth / this.aspectRatio));
    this.imageGenerator = new ImageGenerator(this.imageWidth, this.imageHeight);

    this.center = this.lookFrom;

    const focalLength = this.lookFrom.sub(this.lookAt).length();
    const theta = degreesToRadians(this.vFov);
    const h = Math.tan(theta / 2);
    const viewportHeight = 2 * h * focalLength;
    const viewportWidth = viewportHeight * (this.imageWidth / this.imageHeight);

    this.w = unit(this.lookFrom.sub(this.lookAt));
    this.u = unit(cross(this.vup, this.w));
    this.v = cross(this.w, this.u);

    const viewportU = this.u.scale(viewportWidth);
    const viewportV = this.v.negate().scale(viewportHeight);

    this.pixelDeltaU = viewportU.divide(this.imageWidth);
    this.pixelDeltaV = viewportV.divide(this.imageHeight);

    const viewportUpperLeft = this.center
      .sub(this.w.scale(focalLength))
      .sub(viewportU.divide(2))
      .sub(viewportV.divide(2));
    this.pixel00Loc = viewportUpperLeft.add(this.pixelDeltaU.divide(2)).add(this.pixelDeltaV.divide(2));
  }

  private rayColor(r: RayT, depth: number, world: Hittable): Color {
    if (depth <= 0) {
      return new Vec3(0, 0, 0);
    }
    const { objectHit, rec } = world.hit(r, new Interval(0.001, infinity));
    if (objectHit) {
      const { isScatter, attenuation, scattered } = rec!.mat.scatter(r, rec!);

      if (isScatter) {
        return attenuation.multiply(this.rayColor(scattered, depth - 1, world));
      }

      return new Vec3(0, 0, 0);
    }

    const unitDirection: Vec3 = unit(r.direction);
    const a: number = 0.5 * (unitDirection.y + 1.0);

    const white: Color = new Vec3(1.0, 1.0, 1.0);
    const blue: Color = new Vec3(0.5, 0.7, 1.0);

    return white.scale(1.0 - a).add(blue.scale(a));
  }

  private getRay(i: number, j: number): RayT {
    const pixelCenter = this.pixel00Loc.add(this.pixelDeltaU.scale(i)).add(this.pixelDeltaV.scale(j));
    const pixelSample = pixelCenter.add(this.pixelSampleSquare());

    const rayOrigin = this.center;
    const rayDirection = pixelSample.sub(rayOrigin);

    return new RayT(rayOrigin, rayDirection);
  }

  private pixelSampleSquare(): Vec3 {
    const px: number = -0.5 + randomDouble();
    const py: number = -0.5 + randomDouble();
    return this.pixelDeltaU.scale(px).add(this.pixelDeltaV.scale(py));
  }
}