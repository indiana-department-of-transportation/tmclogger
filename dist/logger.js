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
    LOG_LEVELS[LOG_LEVELS["none"] = 4] = "none";
})(LOG_LEVELS = exports.LOG_LEVELS || (exports.LOG_LEVELS = {}));
const REVERSE_LEVEL_MAP = {
    info: 1,
    warning: 2,
    error: 3,
    none: 4,
};
class Logger {
    constructor(logger = console, level = LOG_LEVELS.warning) {
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
    checkLevel(level) {
        return level >= this.level;
    }
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
    getLogLevel() {
        return this.level;
    }
    info(x) {
        if (this.checkLevel(LOG_LEVELS.info))
            this.logger.log(`${x}`);
        return this;
    }
    warning(x) {
        if (this.checkLevel(LOG_LEVELS.warning))
            this.logger.warn(`${x}`);
        return this;
    }
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