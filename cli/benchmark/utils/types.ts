export interface ISuiteResult {
  name: string;
  period: number;
  frequency: number;
  k: number;
}

export interface ISuiteDescriptor {
  hash: string;
  os: string;
  architecture: string;
  cpu: string;
  date: number;
  fastest: string;
  suites: Array<ISuiteResult>;
}

export interface IBenchmarkResults {
  lastRun: number;
  name: string;
  results: Array<ISuiteDescriptor>;
}

export interface ICliArguments {
  save?: boolean;
}
