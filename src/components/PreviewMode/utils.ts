export function ensureZma() {
  if (window.zma) return window.zma;

  try {
    Object.defineProperty(window, "zma", {
      value: {},
      writable: true,
      configurable: true,
      enumerable: true,
    });
    return window.zma;
  } catch (e) {
    // fallback nếu platform không cho define
    return undefined;
  }
}
