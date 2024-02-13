interface Vertex {
  x: number;
  y: number;
  z: number;
}

interface TextureCoord {
  u: number;
  v: number;
  w: number;
}

interface VertexNormal {
  x: number;
  y: number;
  z: number;
}

interface FaceVertex {
  vertexIndex: number;
  textureCoordsIndex: number;
  vertexNormalIndex: number;
}

interface Face {
  material: string;
  group: string;
  smoothingGroup: number;
  vertices: FaceVertex[];
}

export interface ObjModel {
  name: string;
  vertices: Vertex[];
  textureCoords: TextureCoord[];
  vertexNormals: VertexNormal[];
  faces: Face[];
  lines: number[][];
}

export interface ObjFile {
  models: ObjModel[];
  materialLibraries: string[];
}

export class ObjLoader {
  private fileContents: string;
  private result: ObjFile;

  constructor(fileContents: string) {
    this.fileContents = fileContents;
    this.result = {
      models: [],
      materialLibraries: [],
    };
  }

  parse(): ObjFile {
    this.reset();

    const lines = this.fileContents.split('\n');

    for (const line of lines) {
      const [command, ...params] = line.trim().split(/\s+/);

      switch (command.toLowerCase()) {
        case 'o':
          this.parseObject(params);
          break;
        case 'g':
          this.parseGroup(params);
          break;
        case 'v':
          this.parseVertexCoords(params);
          break;
        case 'vt':
          this.parseTextureCoords(params);
          break;
        case 'vn':
          this.parseVertexNormal(params);
          break;
        case 'l':
          this.parseLine(params);
          break;
        case 's':
          this.parseSmoothShadingStatement(params);
          break;
        case 'f':
          this.parsePolygon(params);
          break;
        case 'mtllib':
          this.parseMtlLib(params);
          break;
        case 'usemtl':
          this.parseUseMtl(params);
          break;
        default:
          break;
      }
    }

    return this.result;
  }

  private reset(): void {
    this.result = {
      models: [],
      materialLibraries: [],
    };
  }

  private parseObject(params: string[]): void {
    const modelName = params.length >= 1 ? params[0] : 'untitled';
    const model: ObjModel = {
      name: modelName,
      vertices: [],
      textureCoords: [],
      vertexNormals: [],
      faces: [{
        material: '',
        group: '',
        smoothingGroup: 0,
        vertices: [],
      }],
      lines: [],
    };
  
    this.result.models.push(model);
  }

  protected parseGroup(params: string[]): void {
    if (params.length !== 1) {
      throw new Error('Group statements must have exactly 1 argument (eg. g group_1)');
    }
  
    const currentModel = this.currentModel();
    if (currentModel.faces.length === 0) {
      currentModel.faces.push({
        material: '',
        group: '',
        smoothingGroup: 0,
        vertices: [],
      });
    }
  
    currentModel.faces[0].group = params[0];
  }

  private parseVertexCoords(params: string[]): void {
    const x = params.length >= 1 ? parseFloat(params[0]) : 0.0;
    const y = params.length >= 2 ? parseFloat(params[1]) : 0.0;
    const z = params.length >= 3 ? parseFloat(params[2]) : 0.0;

    const currentModel = this.currentModel();
    currentModel.vertices.push({ x, y, z });
  }

  private parseTextureCoords(params: string[]): void {
    const u = params.length >= 1 ? parseFloat(params[0]) : 0.0;
    const v = params.length >= 2 ? parseFloat(params[1]) : 0.0;
    const w = params.length >= 3 ? parseFloat(params[2]) : 0.0;

    const currentModel = this.currentModel();
    currentModel.textureCoords.push({ u, v, w });
  }

  private parseVertexNormal(params: string[]): void {
    const x = params.length >= 1 ? parseFloat(params[0]) : 0.0;
    const y = params.length >= 2 ? parseFloat(params[1]) : 0.0;
    const z = params.length >= 3 ? parseFloat(params[2]) : 0.0;

    const currentModel = this.currentModel();
    currentModel.vertexNormals.push({ x, y, z });
  }

  private parseLine(params: string[]): void {
    const currentModel = this.currentModel();
    const line = params.map((vertexString) => parseInt(vertexString));

    currentModel.lines.push(line);
  }

  private parseSmoothShadingStatement(params: string[]): void {
    if (params.length !== 1) {
      throw new Error('Smoothing group statements must have exactly 1 argument (eg. s <number|off>)');
    }

    const currentModel = this.currentModel();
    currentModel.faces[0].smoothingGroup = params[0].toLowerCase() === 'off' ? 0 : parseInt(params[0]);
  }

  private parsePolygon(params: string[]): void {
    const totalVertices = params.length;

    if (totalVertices < 3) {
      throw new Error('Face statement has less than 3 vertices');
    }

    const currentModel = this.currentModel();

    if (currentModel.faces.length === 0) {
      currentModel.faces.push({
        material: '',
        group: '',
        smoothingGroup: 0,
        vertices: [],
      });
    }

    const face: Face = {
      material: currentModel.faces[0].material,
      group: currentModel.faces[0].group,
      smoothingGroup: currentModel.faces[0].smoothingGroup,
      vertices: [],
    };

    for (const vertexString of params) {
      const vertexValues = vertexString.split('/');

      if (vertexValues.length < 1 || vertexValues.length > 3) {
        throw new Error('Too many values (separated by /) for a single vertex');
      }

      const vertexIndex = parseInt(vertexValues[0]);
      const textureCoordsIndex = vertexValues.length > 1 && vertexValues[1] !== '' ? parseInt(vertexValues[1]) : 0;
      const vertexNormalIndex = vertexValues.length > 2 ? parseInt(vertexValues[2]) : 0;

      if (vertexIndex === 0) {
        throw new Error('Faces use an invalid vertex index of 0');
      }

      if (vertexIndex < 0) {
        face.vertices.push({
          vertexIndex: currentModel.vertices.length + 1 + vertexIndex,
          textureCoordsIndex,
          vertexNormalIndex,
        });
      } else {
        face.vertices.push({
          vertexIndex,
          textureCoordsIndex,
          vertexNormalIndex,
        });
      }
    }

    currentModel.faces.push(face);
  }

  private parseMtlLib(params: string[]): void {
    if (params.length >= 1) {
      this.result.materialLibraries.push(params[0]);
    }
  }

  private parseUseMtl(params: string[]): void {
    if (params.length >= 1) {
      const currentModel = this.currentModel();
      currentModel.faces[0].material = params[0];
    }
  }

  private currentModel(): ObjModel {
    const models = this.result.models;
    if (models.length === 0) {
      const defaultModel: ObjModel = {
        name: 'untitled',
        vertices: [],
        textureCoords: [],
        vertexNormals: [],
        faces: [],
        lines: [],
      };
      models.push(defaultModel);
    }

    return models[models.length - 1];
  }
}

