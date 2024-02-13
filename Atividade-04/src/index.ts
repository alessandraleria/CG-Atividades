import ImageGenerator from './utils/generator';
import drawSphere from './utils/drawers/sphere';
import drawTriangle from './utils/drawers/triangle';
import drawObject from './utils/drawers/object';

function main() {
  const sphere = drawSphere();
  const triangle = drawTriangle();
  const obj = drawObject();

  const imageGenerator = new ImageGenerator(400, Math.floor(400 / (16/9)));

  imageGenerator.generateImage('sphere', sphere);
  imageGenerator.generateImage('triangle', triangle);
  imageGenerator.generateImage('generator', obj);
  
}

main();