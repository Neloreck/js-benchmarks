import { Suite } from "benchmark";

const count: number = 1000;
const base: Array<string> = new Array(count);

for (let it = 0; it < count; it ++) {
  base[it] = it.toString();
}

export const description: string = `
Comparing ways to merge array.
`;

export const suite: Suite = new Suite()
  .add("Array.for", () => {
    const target: Array<string> = new Array(count);

    for (const prop in base) {
      target[prop] = base[prop];
    }

    return target;
  })
  .add("Array.spread", () => ([] as Array<string>).concat(base))
  .add("Array.concat", () => [ ...base ]);
