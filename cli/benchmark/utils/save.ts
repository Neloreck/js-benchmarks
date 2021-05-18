import * as os from "os";
import * as path from "path";

import { Suite } from "benchmark";

import { checkAccess, writeFile } from "#/benchmark/utils/fs";
import { IBenchmarkResults, ISuiteDescriptor } from "#/benchmark/utils/types";
import { RESULTS_PATH } from "#/config/build.constants";

export async function saveResults(name: string, hash: string, suite: Suite): Promise<void> {
  const nodeVersion: string = process.version;
  const resultPath: string = path.resolve(RESULTS_PATH, `node_${nodeVersion}.json`);

  /**
   * Create results file for current node version if it does not exist.
   */
  if (!await checkAccess(resultPath)) {
    await createEmptyResultsFile(resultPath);
  }

  const { default: report } = await import(resultPath);
  const fastest = (suite.filter("fastest") as any)[0];
  const now: number = Date.now();

  const currentRunReport: ISuiteDescriptor = {
    hash,
    os: os.version(),
    cpu: os.cpus()[0].model,
    architecture: `${os.platform()}-${os.arch()}`,
    date: now,
    fastest: fastest.name,
    suites: suite.map((it: any) => ({
      name: it.name,
      period: it.times.period,
      frequency: 1000 / it.times.period,
      k: it.times.period * 100 / fastest.times.period / 100
    }))
  };

  report.lastRun = now;
  report.benchmarks[name] = {
    name: name,
    lastRun: now,
    results: Array.isArray(report.benchmarks[name]?.results)
      ? report.benchmarks[name].results.concat([ currentRunReport ])
      : [ currentRunReport ]
  };

  await writeFile(resultPath, stringifyResult(report));
}

export async function createEmptyResultsFile(path: string): Promise<void> {
  const baseResults: IBenchmarkResults = {
    lastRun: 0,
    benchmarks: {}
  };

  await writeFile(path, stringifyResult(baseResults));
}

export function stringifyResult(result: Record<string, any>): string {
  return JSON.stringify(result, null, "  ");
}
