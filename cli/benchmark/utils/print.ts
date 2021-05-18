import { Suite } from "benchmark";
import { green } from "colors";

export function printSuiteResults(suite: Suite): void {
  const fastest = (suite.filter("fastest") as any)[0];

  suite.forEach((it: any) => {
    process.stdout.write(`${green(it.name)} x ${1000 / it.times.period} (${it.times.period}) ` +
    `k=${it.times.period * 100 / fastest.times.period / 100}\n`);
  });

  process.stdout.write(`\nFastest: ${green(suite.filter("fastest").map("name" as any)[0])}.\n`);
}

export function printBenchmarkNotFound(providedScript: any): void {
  process.stderr.write("Expecting actual benchmark");
}
