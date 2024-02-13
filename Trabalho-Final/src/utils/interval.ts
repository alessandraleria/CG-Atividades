import { infinity } from "./utils";

class Interval {

  min: number;
  max: number;

  constructor(_min: number = infinity, _max: number = -infinity) {
    this.min = _min;
    this.max = _max;
  }

  contains(x: number): boolean {
    return this.min <= x && x <= this.max;
  }

  surrounds(x: number): boolean {
    return this.min < x && x < this.max;
  }


  clamp(x: number): number {
    return Math.min(Math.max(x, this.min), this.max);
  }
}

const empty: Interval = new Interval(infinity, -infinity);

const universe: Interval = new Interval(-infinity, infinity);

export { Interval, empty, universe };