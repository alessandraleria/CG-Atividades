import fs from 'fs';
import { exec } from 'child_process';

export default class ImageGenerator {
  private imageWidth: number;
  private imageHeight: number;

  constructor(width: number = 255, height: number = 255) {
    this.imageWidth = width;
    this.imageHeight = height;
  }

  public generateGradientImage(filename: string): void {
    let content = `P3\n${this.imageWidth} ${this.imageHeight}\n255\n`;

    for (let i = 0; i < this.imageHeight; ++i) {
      for (let j = 0; j < this.imageWidth; ++j) {
        const r = j / (this.imageWidth - 1);
        const g = i / (this.imageHeight - 1);
        const b = 0;

        const ir = parseInt((255.999 * r).toString());
        const ig = parseInt((255.999 * g).toString());
        const ib = parseInt((255.999 * b).toString());

        content = `${content}${ir} ${ig} ${ib}\n`;
      }
    }
    this.generateImage(filename, content);
  }

  public generateCircleImage(filename: string): void {
    const centerX = this.imageWidth / 2; 
    const centerY = this.imageHeight / 2; 
    const radius = Math.min(centerX, centerY);

    let content = `P3\n${this.imageWidth} ${this.imageHeight}\n255\n`;

    for (let i = 0; i < this.imageHeight; ++i) {
      for (let j = 0; j < this.imageWidth; ++j) {
        const distanceToCenter = Math.sqrt((j - centerX) ** 2 + (i - centerY) ** 2);

        let r = 0;
        const g = 0;
        const b = 0;

        if (distanceToCenter <= radius) {
          r = 255;
        }
        content = `${content}${r} ${g} ${b}\n`;
      }
    }
    this.generateImage(filename, content);
  }

  public generateSquareImage(filename: string): void {
    const centerX = this.imageWidth / 2;
    const centerY = this.imageHeight / 2;
    const halfSize = 100;

    let content = `P3\n${this.imageWidth} ${this.imageHeight}\n255\n`;

    for (let i = 0; i < this.imageHeight; ++i) {
      for (let j = 0; j < this.imageWidth; ++j) {
        const r = 0;
        let g = 0;
        const b = 0;
        if (j >= centerX - halfSize && j <= centerX + halfSize && i >= centerY - halfSize && i <= centerY + halfSize) {
          g = 255;
        }

        content = `${content}${r} ${g} ${b}\n`;
      }
    }

    this.generateImage(filename, content);
  }

  public generateImage(filename: string, content: string) {
    const sourcePath = 'src/out';
    const ppmPath = `${sourcePath}/ppm/${filename}.ppm`;
    const pngPath = `${sourcePath}/png/${filename}.png`;
  
    fs.writeFileSync(ppmPath, content);
  
    const convertCommand = `magick "${ppmPath}" "${pngPath}"`;
  
    exec(convertCommand, (err) => {
      if (err) {
        console.error(`Error converting image: ${err}`);
        return;
      }
  
      console.log(`Files ${filename}.ppm and ${filename}.png image created successfully in ${sourcePath}!`);
    });
  }
}
