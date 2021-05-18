import * as path from "path";

import { checkAccess, createFileHash, listDirectoryFiles } from "#/benchmark/utils/fs";
import * as out from "#/benchmark/utils/print";
import { saveResults } from "#/benchmark/utils/save";
import { ICliArguments } from "#/benchmark/utils/types";
import { SUITES_PATH } from "#/config/build.constants";

export async function run(targetBenchmarks: Array<string>, options: ICliArguments): Promise<void> {
  const benchmarks: Array<string> = targetBenchmarks.length ? targetBenchmarks : await listDirectoryFiles(SUITES_PATH);

  out.printExecutionInformation(targetBenchmarks);

  for (let it = 0; it < benchmarks.length; it ++) {
    const benchmark: string = benchmarks[it];
    const isLast: boolean = (it === benchmarks.length -1);

    await runBenchmark(benchmark, options);

    if (!isLast && benchmarks.length > 1) {
      out.printBenchmarkExecutionSeparator();
    }
  }
}

export async function runBenchmark(benchmark: string, options: ICliArguments): Promise<void> {
  const benchmarkName: string = benchmark + (benchmark.endsWith(".ts") ? "" : ".ts");
  const benchmarkPath: string | undefined = path.resolve(SUITES_PATH, benchmarkName);

  if (!await checkAccess(benchmarkPath)) {
    return out.printBenchmarkNotFound(benchmarkPath);
  }

  out.printBenchmarkCheckNotification(benchmarkName);

  try {
    const hash: string = await createFileHash(benchmarkPath);
    const { suite } = await import(benchmarkPath);

    out.printBenchmarkStartNotification(benchmarkName);

    await suite.run();

    out.printSuiteResults(suite);

    if (options.save) {
      await saveResults(benchmarkName, hash, suite);
      out.printResultSavedNotification(benchmarkName);
    }
  } catch (error) {
    out.printBenchmarkRunError(error);
  }
}
