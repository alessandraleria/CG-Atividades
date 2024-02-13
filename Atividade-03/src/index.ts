import * as fs from 'fs';
import * as path from 'path';
import { ObjLoader } from './utils/obj_loader';

function main() {
  const filePath = path.resolve(__dirname, './assets/duck.obj');
  const fileContents = fs.readFileSync(filePath, 'utf-8');

  const objLoader = new ObjLoader(fileContents);
  const parsedObj = objLoader.parse();

  const outputFilePath = path.resolve(__dirname, './out/output.txt');
  fs.writeFileSync(outputFilePath, JSON.stringify(parsedObj, null, 2), 'utf-8');

  console.log(`Parsed data saved to ${outputFilePath}`);
}

main();
