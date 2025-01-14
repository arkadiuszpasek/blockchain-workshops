export type LogLevel = "debug" | "info" | "warn" | "error";

export class Logger {
  constructor(private logLevel: LogLevel) {}

  debug(...args: any[]) {
    if (
      this.logLevel === "info" ||
      this.logLevel === "warn" ||
      this.logLevel === "error"
    ) {
      return;
    }
    console.debug(...args);
  }

  info(...args: any[]) {
    if (this.logLevel === "warn" || this.logLevel === "error") {
      return;
    }

    console.log(...args);
  }

  warn(...args: any[]) {
    if (this.logLevel === "error") {
      return;
    }
    console.warn(...args);
  }

  error(...args: any[]) {
    console.error(...args);
  }
}

export const logger = new Logger("info");
