// src/index.ts
import ImageGenerator from './utils/generator';

function main() {
  const imageGenerator = new ImageGenerator();

  imageGenerator.generateGradientImage('gradient');
  imageGenerator.generateCircleImage('circle');
  imageGenerator.generateSquareImage('square');
}

main();
