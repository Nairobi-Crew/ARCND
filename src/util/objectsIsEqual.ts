type PlainObject = Record<string, unknown>;

export function isObject(val: unknown): boolean {
  return Object.prototype.toString.call(val) === '[object Object]';
}

export function isEqual(
  a: PlainObject | unknown,
  b: PlainObject | unknown,
): boolean {
  if (typeof a !== typeof b) {
    return false;
  }

  if ((isObject(a) || Array.isArray(a)) && (isObject(b) || Array.isArray(b))) {
    if (
      Object.keys(a as PlainObject).length
      !== Object.keys(b as PlainObject).length) {
      return false;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [k, v] of Object.entries(a as PlainObject)) {
      if (!isEqual(v as PlainObject,
        (b as PlainObject)[k] as PlainObject)) return false;
    }
    return true;
  }
  return a === b;
}
