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
/**
 * @description Logger class. Aware of env. Defaults to writing to the console.
 *
 * @param {Console} logger Underlying logging utility, defaults to console.
 * @param {LOG_LEVELS} level Log threshold. Defaults to warning.
 * @returns this
 */
export declare class Logger {
    private logger;
    private level;
    constructor(logger?: Console, level?: LOG_LEVELS);
    /**
     * @description Checks whether the called method equals or exceeds the
     * set logging threshold.
     *
     * @private
     * @param level Method log level to check against.
     * @returns {boolean} Whether to log the argument.
     */
    private checkLevel;
    /**
     * @description Sets the logging threshold to the desired level.
     *
     * @param level New logging threshold.
     * @returns this
     */
    setLogLevel(level: String | LOG_LEVELS): this;
    /**
     * @description Returns the current logging level.
     *
     * @returns {number} Current logging threshold.
     */
    getLogLevel(): LOG_LEVELS;
    /**
     * @description Writes to the log method of the underlying utility with a
     * threshold of 'debug'.
     *
     * @param x {Any} The data to log to the underlying utility.
     * @returns this
     */
    debug(x: any): this;
    /**
     * @description Writes to the log method of the underlying utility with a
     * threshold of 'info'.
     *
     * @param x {Any} The data to log to the underlying utility.
     * @returns this
     */
    info(x: any): this;
    /**
     * @description Writes to the warn method of the underlying utility with a
     * threshold of 'warning'.
     *
     * @param x {Any} The data to log to the underlying utility.
     * @returns this
     */
    warning(x: any): this;
    /**
     * @description Writes to the error method of the underlying utility with a
     * threshold of 'error'.
     *
     * @param x {Any} The data to log to the underlying utility.
     * @returns this
     */
    error(x: Error | string): this;
    log: (x: any) => this;
}
declare const _default: Logger;
export default _default;
