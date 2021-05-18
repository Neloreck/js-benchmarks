import { runAll, runSingle } from "#/benchmark/utils";

const targetScript: string | undefined = process.argv[2];

if (!targetScript || targetScript === "*") {
  runAll();
} else {
  runSingle(targetScript);
}

