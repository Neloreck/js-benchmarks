import { Suite } from "benchmark";
import { green, red } from "colors";

export function printExecutionInformation(benchmarks: Array<string>): void {
  process.stdout.write(benchmarks.length
    ? `Executing provided benchmarks (${benchmarks.length}).\n\n`
    : `Executing ${green("all")} existing benchmarks.\n\n`);
}

export function printSuiteResults(suite: Suite): void {
  const fastest = (suite.filter("fastest") as any)[0];

  suite.forEach((it: any) => {
    process.stdout.write(`${green(it.name)} x ${1000 / it.times.period} ` +
    `k=${it.times.period / fastest.times.period}\n`);
  });

  process.stdout.write(`\nFastest: ${green(suite.filter("fastest").map("name" as any)[0])}.\n`);
}

export function printSeparator(): void {
  process.stdout.write("\n");
}

export function printBenchmarkExecutionSeparator(): void {
  process.stdout.write("\n");
}

export function printBenchmarkCheckNotification(scriptName: string): void {
  process.stdout.write(`Checking benchmark: '${green(scriptName)}'.\n`);
}

export function printBenchmarkStartNotification(scriptName: string): void {
  process.stdout.write(`Running benchmark: '${green(scriptName)}'.\n\n`);
}

export function printResultSavedNotification(scriptName: string): void {
  process.stdout.write(`Script '${green(scriptName)}' results were saved.\n`);
}

export function printBenchmarkNotFound(providedScriptPath: string): void {
  process.stderr.write(`Following script was not found: ${red(providedScriptPath)}.\n`);
}

export function printBenchmarkRunError(error: Error): void {
  process.stderr.write(`Failed to run benchmark: ${error.name} -> ${error.message}`);
}
