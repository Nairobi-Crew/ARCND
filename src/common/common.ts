import {quickSort} from "Util/quickSort";
  declare global {
    interface Array<T> {
      customSort: Function;
    }
  }

export function init() {
  Array.prototype.customSort = function (sortCallback: Function | undefined = undefined) {
    if (!sortCallback) return quickSort(this)
    if (sortCallback) return quickSort(this, sortCallback)
  }
}
