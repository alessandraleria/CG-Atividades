import writeColor, { Color } from "../Color";
import HittableSphere from "../hittable/hittable_sphere";
import { RayT } from "../ray";
import { Vec3, unit } from "../vec/vec_3";

function rayColor(r: RayT, frameNumber: number): Color {
  const sunRadius = 1.5;
  const mercuryRadius = 0.2;
  const venusRadius = 0.4;
  const earthRadius = 0.5;
  const marsRadius = 0.3;
  const jupiterRadius = 1.0;
  const moonRadius = 0.2;

  const sunCenter = new Vec3(0, 0, -10);
  const mercuryOrbitRadius = 2;
  const venusOrbitRadius = 3;
  const earthOrbitRadius = 5;
  const marsOrbitRadius = 6;
  const jupiterOrbitRadius = 8;
  const moonOrbitRadius = 1.5;

  const mercuryOrbitAngle = (frameNumber / 88) * Math.PI * 2;
  const venusOrbitAngle = (frameNumber / 225) * Math.PI * 2;
  const earthOrbitAngle = (frameNumber / 365) * Math.PI * 2;
  const marsOrbitAngle = (frameNumber / 687) * Math.PI * 2;
  const jupiterOrbitAngle = (frameNumber / 4333) * Math.PI * 2;
  const moonOrbitAngle = (frameNumber / 30) * Math.PI * 2;

  // Crie os centros dos planetas
  const createPlanetCenter = (sunCenter: Vec3, orbitRadius: number, orbitAngle: number) => {
    return new Vec3(
      sunCenter.x + Math.cos(orbitAngle) * orbitRadius,
      sunCenter.y,
      sunCenter.z + Math.sin(orbitAngle) * orbitRadius
    );
  };

  const mercuryCenter = createPlanetCenter(sunCenter, mercuryOrbitRadius, mercuryOrbitAngle);
  const venusCenter = createPlanetCenter(sunCenter, venusOrbitRadius, venusOrbitAngle);
  const earthCenter = createPlanetCenter(sunCenter, earthOrbitRadius, earthOrbitAngle);
  const marsCenter = createPlanetCenter(sunCenter, marsOrbitRadius, marsOrbitAngle);
  const jupiterCenter = createPlanetCenter(sunCenter, jupiterOrbitRadius, jupiterOrbitAngle);

  const moonCenter = new Vec3(
    earthCenter.x + Math.cos(moonOrbitAngle) * moonOrbitRadius,
    earthCenter.y,
    earthCenter.z + Math.sin(moonOrbitAngle) * moonOrbitRadius
  );

  // Crie as esferas para os planetas
  const sun = new HittableSphere(sunCenter, sunRadius, new Vec3(1, 1, 0));
  const mercury = new HittableSphere(mercuryCenter, mercuryRadius, new Vec3(0.5, 0.5, 0.5));
  const venus = new HittableSphere(venusCenter, venusRadius, new Vec3(0.9, 0.6, 0.2));
  const earth = new HittableSphere(earthCenter, earthRadius, new Vec3(0, 0, 1));
  const mars = new HittableSphere(marsCenter, marsRadius, new Vec3(0.8, 0.4, 0));
  const jupiter = new HittableSphere(jupiterCenter, jupiterRadius, new Vec3(0.6, 0.4, 0.2));
  const moon = new HittableSphere(moonCenter, moonRadius, new Vec3(0.7, 0.7, 0.7));

  const celestialBodies = [sun, mercury, venus, earth, mars, jupiter, moon];

  let closestHit = null;
  let closestHitDistance = Infinity;
  let pixelColor: Vec3;

  // Verifique a colisão com cada corpo celeste
  for (let body of celestialBodies) {
    const hitDistance = body.hit(r);
    if (hitDistance && hitDistance < closestHitDistance) {
      closestHit = body;
      closestHitDistance = hitDistance;
    }
  }

  if (closestHit) {
    // Se o raio atingir um corpo celeste, atualize a cor do pixel
    pixelColor = closestHit.getColor();
  } else {
    const unitDirection: Vec3 = unit(r.direction);
    const t: number = 0.5 * (unitDirection.y + 1.0);
    pixelColor = new Vec3(1.0, 1.0, 1.0).scale(1.0 - t).add(new Vec3(0.5, 0.7, 1.0).scale(t));
  }
  return pixelColor;
}


export default function drawPlanet(frameNumber: number): string {
  const aspectRatio: number = 16.0 / 9.0;
  const imageWidth: number = 200;
  let imageHeight: number = Math.max(1, Math.floor(imageWidth / aspectRatio / 2) * 2); // Garante que seja divisível por 2

  const focalLength: number = 1.0;
  const viewportHeight: number = 2.0;
  const viewportWidth: number = viewportHeight * (imageWidth / imageHeight);
  const cameraCenter: Vec3 = new Vec3(0, 2, 2);

  const viewportU: Vec3 = new Vec3(viewportWidth, 0.2, -1);
  const viewportV: Vec3 = new Vec3(0, -viewportHeight, 0);

  const pixelDeltaU: Vec3 = viewportU.divide(imageWidth);
  const pixelDeltaV: Vec3 = viewportV.divide(imageHeight);

  const viewportUpperLeft: Vec3 = cameraCenter
    .sub(new Vec3(0, 0, focalLength))
    .sub(viewportU.divide(2))
    .sub(viewportV.divide(2));
  const pixel00Loc: Vec3 = viewportUpperLeft.add(pixelDeltaU.scale(0.5).add(pixelDeltaV.scale(0.5)));

  let result = `P3\n${imageWidth} ${imageHeight}\n255\n`;
  for (let j = 0; j < imageHeight; j++) {
    for (let i = 0; i < imageWidth; i++) {
      const pixelCenter: Vec3 = pixel00Loc.add(pixelDeltaU.scale(i)).add(pixelDeltaV.scale(j));
      const rayTDirection: Vec3 = pixelCenter.sub(cameraCenter);
      const r: RayT = new RayT(cameraCenter, rayTDirection);

      const pixelColor: Vec3 = rayColor(r, frameNumber);
      result += writeColor(pixelColor);
    }
  }
  console.log(`Done Frame ${frameNumber}\n`);
  return result;
}
