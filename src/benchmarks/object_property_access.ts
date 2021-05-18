import { Suite } from "benchmark";

const symbolKey: unique symbol = Symbol();
const stringKey: string = "str";
const numberKey: number = 0;

const sampleObject = {
  [numberKey]: {},
  [stringKey]: {},
  [symbolKey]: {}
};

export const description: string = `
Comparing javascript object properties access in a different ways.
`;

export const suite: Suite = new Suite()
  .add("access#string-prop", () => sampleObject[stringKey])
  .add("access#number-prop", () => sampleObject[numberKey])
  .add("access#symbol-prop", () => sampleObject[symbolKey])
  .add("access#direct-name", () => sampleObject.str);
