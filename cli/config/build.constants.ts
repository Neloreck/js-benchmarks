import * as path from "path";

export const PROJECT_ROOT = path.resolve(__dirname, "../..");
export const SRC_PATH = path.resolve(PROJECT_ROOT, "./src");

export const SUITES_PATH = path.resolve(SRC_PATH, "./benchmarks");
export const RESULTS_PATH = path.resolve(PROJECT_ROOT, "./results");

