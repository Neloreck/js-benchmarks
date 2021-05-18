import { Suite } from "benchmark";

const target: Record<number, number> = {};

for (let it = 0; it < 1000; it ++) {
  target[it] = it;
}

const values = Object.values(target);

export const description: string = `
  Comparing speed of object key iteration methods.
`;

export const suite: Suite = new Suite()
  .add("object_values_for", () => {
    let count: number = 0;

    for (let it = 0; it < values.length; it += 1) {
      count += values[it];
    }
  })
  .add("object_values_for_of", () => {
    let count: number = 0;

    for (const value of values) {
      count += value;
    }
  });

