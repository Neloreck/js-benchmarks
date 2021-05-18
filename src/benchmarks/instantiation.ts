import { Suite } from "benchmark";

import { TCallable } from "@/types";

const times: number = 100;

const repeat = (cb: TCallable) => {
  for (let it = 0; it < times; it += 1) {
    cb();
  }
};

class SampleClass {}

export const description: string = `
Comparing default data types instantiation for javascript.
`;

export const suite: Suite = new Suite()
  .add("object_literal", () => repeat(() => ({})))
  .add("null_object", () => repeat(() => Object.create(null)))
  .add("sample_class", () => repeat(() => new SampleClass()))
  .add("string", () => repeat(() => ""))
  .add("function", () => repeat(() => new Function()))
  .add("number", () => repeat(() => 100))
  .add("map", () => repeat(() => new Map()))
  .add("weak_map", () => repeat(() => new Map()))
  .add("set", () => repeat(() => new Set()))
  .add("weak_set", () => repeat(() => new WeakSet()))
  .add("symbol", () => repeat(() => Symbol()))
  .add("boolean", () => repeat(() => false));
