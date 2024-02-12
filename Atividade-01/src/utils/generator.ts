// src/utils/GenerateImage.ts

import { createCanvas, Canvas } from 'canvas';
import fs from 'fs';

export default class ImageGenerator {
  private imageWidth: number;
  private imageHeight: number;

  constructor(width: number = 255, height: number = 255) {
    this.imageWidth = width;
    this.imageHeight = height;
  }

  private generateImage(filename: string, canvas: Canvas): void {
    const sourcePath = `./src/out`;
    const ppmFilePath = `${sourcePath}/ppm/${filename}.ppm`;
    const pngFilePath = `${sourcePath}/png/${filename}.png`;

    fs.writeFileSync(ppmFilePath, this.canvasToPPM(canvas));

    const stream = fs.createWriteStream(pngFilePath);
    const pngStream = canvas.createPNGStream();
    pngStream.pipe(stream);
    stream.on('finish', () => {
      console.log(`Files ${filename}.ppm and ${filename}.png created successfully in src/out!`);
    });
  }

  private canvasToPPM(canvas: Canvas): string {
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context from canvas');
    }

    const imageData = context.getImageData(0, 0, this.imageWidth, this.imageHeight).data;

    let content = `P3\n${this.imageWidth} ${this.imageHeight}\n255\n`;

    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      content += `${r} ${g} ${b}\n`;
    }

    return content;
  }

  public generateGradientImage(filename: string): void {
    const canvas = createCanvas(this.imageWidth, this.imageHeight);
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context from canvas');
    }

    const gradient = context.createLinearGradient(0, 0, this.imageWidth, this.imageHeight);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1, 'green');

    context.fillStyle = gradient;
    context.fillRect(0, 0, this.imageWidth, this.imageHeight);

    this.generateImage(filename, canvas);
  }

  public generateCircleImage(filename: string): void {
    const canvas = createCanvas(this.imageWidth, this.imageHeight);
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context from canvas');
    }

    const centerX = this.imageWidth / 2;
    const centerY = this.imageHeight / 2;
    const radius = Math.min(centerX, centerY);

    context.fillStyle = 'red';
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fill();

    this.generateImage(filename, canvas);
  }

  public generateSquareImage(filename: string): void {
    const canvas = createCanvas(this.imageWidth, this.imageHeight);
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D context from canvas');
    }

    const centerX = this.imageWidth / 2;
    const centerY = this.imageHeight / 2;
    const halfSize = 100;

    context.fillStyle = 'blue';
    context.fillRect(centerX - halfSize, centerY - halfSize, halfSize * 2, halfSize * 2);

    this.generateImage(filename, canvas);
  }
}
