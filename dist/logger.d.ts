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
export declare enum LOG_LEVELS {
    info = 1,
    warning = 2,
    error = 3,
    debug = 4,
    none = 5
}
export declare class Logger {
    private logger;
    private level;
    constructor(logger?: Console, level?: LOG_LEVELS);
    private checkLevel;
    setLogLevel(level: String | LOG_LEVELS): this;
    getLogLevel(): LOG_LEVELS;
    debug(x: any): this;
    info(x: any): this;
    warning(x: any): this;
    error(x: Error | string): this;
    log: (x: any) => this;
}
declare const _default: Logger;
export default _default;
