import { Suite } from "benchmark";

const preCompiled: RegExp = new RegExp("/o/");

export const description: string = `
Comparing ways to find substring in a JS string.
`;

export const suite: Suite = new Suite()
  .add("RegExp#inline", () => /o/.test("Hello World!"))
  .add("RegExp#precompiled", () => preCompiled.test("Hello World!"))
  .add("String#indexOf", () => "Hello World!".indexOf("o") > -1);
