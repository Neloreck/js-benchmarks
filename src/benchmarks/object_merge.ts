import { Suite } from "benchmark";

const count: number = 1000;
const base: Record<string, any> = {};

for (let it = 0; it < count; it ++) {
  base[it] = it;
}

/**
 * Sample object merging method.
 */
function mergeObjects(destination: Record<string, any>, source: Record<string, any>): void {
  for (const prop in base) {
    destination[prop] = source[prop];
  }
}

export const description: string = `
Comparing ways to merge objects.
`;

export const suite: Suite = new Suite()
  .add("Object.inlineFor", () => {
    const target: Record<string, any> = {};

    for (const prop in base) {
      target[prop] = base[prop];
    }

    return target;
  })
  .add("Object.inlineForWithOwnProperty", () => {
    const target: Record<string, any> = {};

    for (const prop in base) {
      if (Object.prototype.hasOwnProperty.call(base, prop)) {
        target[prop] = base[prop];
      }
    }

    return target;
  })
  .add("Object.functionalFor", () => mergeObjects({}, base))
  .add("Object.spread", () => Object.assign({}, base))
  .add("Object.assign", () => ({ ...base }));
