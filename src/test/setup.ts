import "@testing-library/jest-dom/vitest";

// Use deterministic browser storage rather than Node's experimental localStorage.
const storedValues = new Map<string, string>();
const testStorage = {
  getItem: (key: string) => storedValues.get(key) ?? null,
  setItem: (key: string, value: string) => {
    storedValues.set(key, String(value));
  },
  removeItem: (key: string) => {
    storedValues.delete(key);
  },
  clear: () => storedValues.clear(),
  key: (index: number) => [...storedValues.keys()][index] ?? null,
  get length() {
    return storedValues.size;
  },
};
Object.defineProperty(window, "localStorage", { configurable: true, value: testStorage });
Object.defineProperty(globalThis, "localStorage", { configurable: true, value: testStorage });

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
});

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
