import * as os from "os";
import * as path from "path";

import { Suite } from "benchmark";

import { ensureDirExists, ensureFileExists, writeFile } from "#/benchmark/utils/fs";
import { IBenchmarkResults, ISuiteDescriptor } from "#/benchmark/utils/types";
import { RESULTS_PATH } from "#/config/build.constants";

/**
 * Save results for specific file/hash with resulting suite.
 */
export async function saveResults(name: string, hash: string, suite: Suite): Promise<void> {
  const resultsFolder: string = path.resolve(RESULTS_PATH, `node_${process.version}`);
  const resultPath: string = path.resolve(resultsFolder, `${name}.json`);

  await ensureDirExists(resultsFolder);
  await ensureFileExists(resultPath, createBaseResults(name));

  const { default: report } = await import(resultPath);

  await writeFile(resultPath, getUpdatedReport({ report, name, hash, suite }));
}

/**
 * Update report with provided updates.
 */
export function getUpdatedReport({
  report,
  suite,
  hash
}: {
  report: IBenchmarkResults;
  suite: Suite;
  name: string;
  hash: string;
}): string {
  const now: number = Date.now();
  const fastest = (suite.filter("fastest") as any)[0];

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
  report.results = Array.isArray(report.results)
    ? report.results.concat([ currentRunReport ])
    : [ currentRunReport ];

  return JSON.stringify(report, null, "  ");
}

export function createBaseResults(name: string): string {
  const baseResults: IBenchmarkResults = {
    name: name,
    lastRun: 0,
    results: []
  };

  return JSON.stringify(baseResults, null, "  ");
}
