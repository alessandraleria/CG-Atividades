export abstract class VecUtils {
  protected e: number[];

  constructor(...elements: number[]) {
    this.e = elements;
  }

  get(index: number): number {
    return this.e[index];
  }

  set(index: number, value: number): void {
    this.e[index] = value;
  }

  abstract add(v: VecUtils): VecUtils;

  abstract scale(t: number): VecUtils;

  abstract divide(t: number): VecUtils;

  abstract length(): number;

  abstract lengthSquared(): number;
}