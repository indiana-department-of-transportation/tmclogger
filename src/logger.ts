/**
 * logger
 *
 * @description Custom react logger. Checks env before logging to prevent
 * accidental production logging. Borrows heavily from how Python's logging
 * module works.
 *
 * @author jarsmith@indot.in.gov
 * @license MIT
 * @copyright INDOT, 2019
 */

export enum LOG_LEVELS {
  info = 1,
  warning,
  error,
  debug,
  none,
}

type IConsole = typeof console;

type lmp = {
  [key: string]: number | undefined,
  info: 1,
  warning: 2,
  error: 3,
  debug: 4,
  none: 5,
}

const REVERSE_LEVEL_MAP: lmp = {
  info: 1,
  warning: 2,
  error: 3,
  debug: 4,
  none: 5,
};

export class Logger {
  private logger: IConsole;
  private level: LOG_LEVELS;
  constructor(logger = console, level: LOG_LEVELS = LOG_LEVELS.warning) {
    const NODE_ENV = (typeof process !== 'undefined'
      && process
      && process.env
      && process.env.NODE_ENV)
      || 'production';

    this.logger = logger;

    // Won't log in production. If production logging is desired, call
    // console methods directly.
    this.level = NODE_ENV === 'production' ? LOG_LEVELS.none : level;
  }

  private checkLevel(level: LOG_LEVELS): boolean {
    return level >= this.level;
  }

  public setLogLevel(level: String | LOG_LEVELS) {
    if (typeof level === 'string') {
      if (level in REVERSE_LEVEL_MAP) {
        const n = REVERSE_LEVEL_MAP[level];
        this.setLogLevel(n as LOG_LEVELS);
      } else {
        throw new TypeError(`Attempt to set log level to unrecognized level '${level}'.`);
      }
    } else {
      this.level = (level as LOG_LEVELS);
    }

    return this;
  }

  public getLogLevel() {
    return this.level;
  }

  public debug(x: any) {
    if (this.checkLevel(LOG_LEVELS.debug)) this.logger.log(x);
    return this;
  }

  public info(x: any) {
    if (this.checkLevel(LOG_LEVELS.info)) this.logger.log(x);
    return this;
  }

  public warning(x: any) {
    if(this.checkLevel(LOG_LEVELS.warning)) this.logger.warn(x);
    return this;
  }

  public error(x: Error | string) {
    if (this.checkLevel(LOG_LEVELS.error)) {
      if (x instanceof Error) {
        this.logger.error(x);
      } else {
        this.logger.error(`${x}`);
      }
    }

    return this;
  }

  log = this.info;
}

export default new Logger();
