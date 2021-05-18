import * as path from "path";

import { green } from "colors";

import { checkAccess, createFileHash, listDirectoryFiles } from "#/benchmark/utils/fs";
import { printBenchmarkNotFound, printSuiteResults } from "#/benchmark/utils/print";
import { saveResults } from "#/benchmark/utils/save";
import { SUITES_PATH } from "#/config/build.constants";

export async function runAll(): Promise<void> {
  const scripts: Array<string> = await listDirectoryFiles(SUITES_PATH);

  process.stdout.write(`Running all available benchmarks (${green(scripts.length.toString())}).\n`);

  for (const script of scripts) {
    await runSingle(script);
  }
}

export async function runSingle(script: string): Promise<void> {
  const scriptName: string = script + (script.endsWith(".ts") ? "" : ".ts");
  const scriptPath: string | undefined = path.resolve(SUITES_PATH, scriptName);

  if (!await checkAccess(scriptPath)) {
    return printBenchmarkNotFound(scriptName);
  }

  process.stdout.write(`Running benchmark script, target: '${green(scriptName)}'.\n`);

  try {
    const hash: string = await createFileHash(scriptPath);
    const { suite } = await import(scriptPath);

    process.stdout.write(`Found benchmark, running: '${green(scriptPath)}'.\n\n`);

    suite.run({ "async": false });

    printSuiteResults(suite);

    process.stdout.write("Benchmark run success, saving results.\n");

    await saveResults(scriptName, hash, suite);

    process.stdout.write("Results saved.\n");
  } catch (error) {
    process.stderr.write(`Failed to run benchmark: '${error.message}'.\n`);
  }
}
