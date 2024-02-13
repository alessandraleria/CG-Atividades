import { ObjLoader } from "../utils/obj_loader";

describe('ObjLoader', () => {
  it('should parse vertices and faces correctly', () => {
    const objContents = `
      v 1.0 2.0 3.0
      v 4.0 5.0 6.0
      v 7.0 8.0 9.0
      f 1 2 3
    `;
    const objLoader = new ObjLoader(objContents);
    const result = objLoader.parse();

    expect(result.models).toHaveLength(1);
    const model = result.models[0];

    console.log(model);

    // Verificar se os vértices foram parseados corretamente
    expect(model.vertices).toHaveLength(3);
    expect(model.vertices[0]).toEqual({ x: 1.0, y: 2.0, z: 3.0 });
    expect(model.vertices[1]).toEqual({ x: 4.0, y: 5.0, z: 6.0 });
    expect(model.vertices[2]).toEqual({ x: 7.0, y: 8.0, z: 9.0 });

    expect(model.faces).toHaveLength(2);
    expect(model.faces[1].vertices).toHaveLength(3); 
    expect(model.faces[1].vertices[0]).toEqual({ vertexIndex: 1, textureCoordsIndex: 0, vertexNormalIndex: 0 });
    expect(model.faces[1].vertices[1]).toEqual({ vertexIndex: 2, textureCoordsIndex: 0, vertexNormalIndex: 0 });
    expect(model.faces[1].vertices[2]).toEqual({ vertexIndex: 3, textureCoordsIndex: 0, vertexNormalIndex: 0 });
  });
});
