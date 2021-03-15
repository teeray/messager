import { Injectable } from "@angular/core";
import { DomHelper } from "./domHelper";

@Injectable({
  providedIn: 'root',
})
export class ModelHelper {
  constructor(public dom: DomHelper) { }
  public deepEqual(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    const t = x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length && x.toString() === y.toString() &&
      ok(x).every(key => this.deepEqual(x[key], y[key]))
    ) : (x === y);
    if (!t && this.dom.isLocal) {
      console.log(x)
      console.log(y)
    }
    return t;
  }
}