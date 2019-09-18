"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var LOG_LEVELS;
(function (LOG_LEVELS) {
    LOG_LEVELS[LOG_LEVELS["info"] = 1] = "info";
    LOG_LEVELS[LOG_LEVELS["warning"] = 2] = "warning";
    LOG_LEVELS[LOG_LEVELS["error"] = 3] = "error";
    LOG_LEVELS[LOG_LEVELS["debug"] = 4] = "debug";
    LOG_LEVELS[LOG_LEVELS["none"] = 5] = "none";
})(LOG_LEVELS = exports.LOG_LEVELS || (exports.LOG_LEVELS = {}));
const REVERSE_LEVEL_MAP = {
    info: 1,
    warning: 2,
    error: 3,
    debug: 4,
    none: 5,
};
/**
 * @description Logger class. Aware of env. Defaults to writing to the console.
 *
 * @param {Console} logger Underlying logging utility, defaults to console.
 * @param {LOG_LEVELS} level Log threshold. Defaults to warning.
 * @returns this
 */
class Logger {
    constructor(logger = console, level = LOG_LEVELS.warning) {
        // alias for the info method.
        this.log = this.info;
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
    /**
     * @description Checks whether the called method equals or exceeds the
     * set logging threshold.
     *
     * @private
     * @param level Method log level to check against.
     * @returns {boolean} Whether to log the argument.
     */
    checkLevel(level) {
        return level >= this.level;
    }
    /**
     * @description Sets the logging threshold to the desired level.
     *
     * @param level New logging threshold.
     * @returns this
     */
    setLogLevel(level) {
        if (typeof level === 'string') {
            if (level in REVERSE_LEVEL_MAP) {
                const n = REVERSE_LEVEL_MAP[level];
                this.setLogLevel(n);
            }
            else {
                throw new TypeError(`Attempt to set log level to unrecognized level '${level}'.`);
            }
        }
        else {
            this.level = level;
        }
        return this;
    }
    /**
     * @description Returns the current logging level.
     *
     * @returns {number} Current logging threshold.
     */
    getLogLevel() {
        return this.level;
    }
    /**
     * @description Writes to the log method of the underlying utility with a
     * threshold of 'debug'.
     *
     * @param x {Any} The data to log to the underlying utility.
     * @returns this
     */
    debug(x) {
        if (this.checkLevel(LOG_LEVELS.debug))
            this.logger.log(x);
        return this;
    }
    /**
     * @description Writes to the log method of the underlying utility with a
     * threshold of 'info'.
     *
     * @param x {Any} The data to log to the underlying utility.
     * @returns this
     */
    info(x) {
        if (this.checkLevel(LOG_LEVELS.info))
            this.logger.log(x);
        return this;
    }
    /**
     * @description Writes to the warn method of the underlying utility with a
     * threshold of 'warning'.
     *
     * @param x {Any} The data to log to the underlying utility.
     * @returns this
     */
    warning(x) {
        if (this.checkLevel(LOG_LEVELS.warning))
            this.logger.warn(x);
        return this;
    }
    /**
     * @description Writes to the error method of the underlying utility with a
     * threshold of 'error'.
     *
     * @param x {Any} The data to log to the underlying utility.
     * @returns this
     */
    error(x) {
        if (this.checkLevel(LOG_LEVELS.error)) {
            if (x instanceof Error) {
                this.logger.error(x);
            }
            else {
                this.logger.error(`${x}`);
            }
        }
        return this;
    }
}
exports.Logger = Logger;
exports.default = new Logger();
//# sourceMappingURL=logger.js.map