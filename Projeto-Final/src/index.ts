// Importar módulos necessários
import fs from 'fs';
import { exec } from 'child_process';
import drawPlanet from './utils/drawers/planets';

// Função para gerar um frame da animação
function generateFrame(frameNumber: number): string {
  return drawPlanet(frameNumber);
}

// Função para gerar a animação completa
function generateAnimation(outputPath: string): void {
  const frames: string[] = [];

  for (let frameNumber = 0; frameNumber < 60; frameNumber++) {
    const frame = generateFrame(frameNumber);
    frames.push(frame);
  }

  frames.forEach((frame, index) => {
    const filename = `frame_${index.toString().padStart(4, '0')}`;
    const ppmPath = `src/out/frames/${filename}.ppm`;
    fs.writeFileSync(ppmPath, frame);

    const finalFramePath = `src/out/final_frames/${filename}.ppm`;
    exec(`magick src/assets/bg.jpg ${ppmPath} -gravity center -composite ${finalFramePath}`, (err) => {
      if (err) {
        console.error(`Error adding background to frame: ${err}`);
        return;
      }
    });
  });

  // Alteração no caminho para a pasta src/out/video
  const videoPath = `src/out/video/${outputPath}`;
  const convertCommand = `ffmpeg -framerate 30 -i src/out/final_frames/frame_%04d.ppm -c:v libx264 -pix_fmt yuv420p ${videoPath}`;  
  exec(convertCommand, (err) => {
    if (err) {
      console.error(`Error converting frames to video: ${err}`);
      return;
    }

    console.log(`Video created successfully: ${videoPath}`);
  });
}

// Chamar a função para gerar a animação
generateAnimation('solar_system_animation.mp4');
