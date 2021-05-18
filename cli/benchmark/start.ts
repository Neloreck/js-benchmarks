import { Command } from "commander";

import { ICliArguments, run } from "#/benchmark/utils";

const program = new Command()
  .name("benchmark-cli")
  .arguments("[benchmarks...]")
  .option("-s, --save", "save report of benchmarking in file", false)
  .action((benchmarks: Array<string>, options: ICliArguments, command) => run(benchmarks, options));

program.parse(process.argv);
