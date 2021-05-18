import { Suite } from "benchmark";

import { TAnyObject } from "@/types";

const normalMap = new Map();
const weakMap = new WeakMap();
const objectDictionary: Record<string, any> = {};
const nullPrototypeDictionary: Record<string, any> = Object.create(null);

const stringKey: string = "key";
const objectKey: TAnyObject = {};
const value: TAnyObject = {};

normalMap.set(stringKey, value);
objectDictionary[stringKey] = value;
nullPrototypeDictionary[stringKey] = value;

normalMap.set(objectKey, value);
weakMap.set(objectKey, value);

export const description: string = `
Comparing speed of key access to dictionaries and maps.
`;

export const suite: Suite = new Suite()
  .add("map#string key", () => normalMap.get(stringKey))
  .add("dictionary#string key", () => objectDictionary[stringKey])
  .add("null_proto_dictionary#string key", () => nullPrototypeDictionary[stringKey])
  .add("map#object key", () => normalMap.get(objectKey))
  .add("weak_map#object key", () => weakMap.get(objectKey));
