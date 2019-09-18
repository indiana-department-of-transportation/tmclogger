/**
 * logger.test
 *
 * @description Test file for INDOT logger.
 *
 * @author jarsmith@indot.in.gov
 * @license MIT
 * @copyright INDOT, 2019
 */

import logger, { LOG_LEVELS, Logger } from './logger';

type IConsole = typeof console;

class FakeConsole {
  memory = null;
  Console: any = null;

  table(...tabularData: any[]) {}

  markTimeline(label?: string) {}

  timeline(label?: string) { }

  timeStamp(label?: string) { }

  timelineEnd(label?: string) { }

  countReset(label?: string) { }

  timeLog(label?: string, ...data: any[]) { }

  exception(message?: string, ...optionalParams: any[]) {}

  info(message?: any, ...optionalParams: any[]) {}

  profile(reportName?: string) {}

  assert(test?: boolean, message?: string, ...optionalParams: any[]) {}

  msIsIndependentlyComposed(element: Element) {
    return false;
  }

  clear() {}

  dir(value?: any, ...optionalParams: any[]) {}

  warn(message?: any, ...optionalParams: any[]) {}

  error(message?: any, ...optionalParams: any[]) {}

  log(message?: any, ...optionalParams: any[]) {}

  profileEnd() {}

  count(countTitle?: string) {}

  groupEnd() {}

  time(timerName?: string) {}

  timeEnd(timerName?: string) {}

  trace() {}

  group(groupTitle?: string) {}

  dirxml(value: any) {}

  debug(message?: string, ...optionalParams: any[]) {}

  groupCollapsed(groupTitle?: string) {}

  select(element: Element) {}
};

describe('logger', () => {
  it('should take an optional logging object', () => {
    expect(() => new Logger(new FakeConsole())).not.toThrowError();
    expect(() => new Logger()).not.toThrowError();
  });

  it('should take an optional log level', () => {
    expect(() => new Logger(new FakeConsole(), LOG_LEVELS.error)).not.toThrowError();
  });

  it('should have get and set methods for the log level', () => {
    const lgr = new Logger();
    expect(typeof lgr.getLogLevel).toBe('function');
    expect(typeof lgr.setLogLevel).toBe('function');
    expect(typeof lgr.getLogLevel()).toBe('number');
    const lvl = lgr.getLogLevel();
    if (lvl === LOG_LEVELS.warning) {
      lgr.setLogLevel(LOG_LEVELS.error);
      expect(lvl).not.toBe(lgr.getLogLevel());
    } else {
      lgr.setLogLevel(LOG_LEVELS.warning);
      expect(lvl).not.toBe(lgr.getLogLevel());
    }
  });

  it('should default to a log level of warning', () => {
    expect(new Logger().getLogLevel()).toBe(LOG_LEVELS.warning);
  });

  it('should have a "info"/"log" method that calls the underlying logging object if the level is correct', () => {
    const cnsle = new FakeConsole();
    cnsle.log = jest.fn();
    const lgr = new Logger(cnsle, LOG_LEVELS.info);
    expect(lgr.info).toBe(lgr.log);
    lgr.info('test');
    expect(cnsle.log).toHaveBeenLastCalledWith('test');
    lgr.setLogLevel(LOG_LEVELS.none);
    lgr.info('boo');
    expect(cnsle.log).toHaveBeenCalledTimes(1);
  });

  it('should have a "error" method that calls the underlying logging object if the level is correct', () => {
    const cnsle = new FakeConsole();
    cnsle.error = jest.fn();
    const lgr = new Logger(cnsle, LOG_LEVELS.info);
    const err = new Error('test');
    lgr.error(err);
    expect(cnsle.error).toHaveBeenLastCalledWith(err);
    lgr.setLogLevel(LOG_LEVELS.none);
    lgr.error(err);
    expect(cnsle.error).toHaveBeenCalledTimes(1);
  });

  it('should have a "warning" method that calls the underlying logging object if the level is correct', () => {
    const cnsle = new FakeConsole();
    cnsle.warn = jest.fn();
    const lgr = new Logger(cnsle, LOG_LEVELS.info);
    lgr.warning('test');
    expect(cnsle.warn).toHaveBeenLastCalledWith('test');
    lgr.setLogLevel(LOG_LEVELS.none);
    lgr.warning('boo');
    expect(cnsle.warn).toHaveBeenCalledTimes(1);
  });

  it('should have a hierarchy of logging levels', () => {
    const cnsle = new FakeConsole();
    cnsle.warn = jest.fn();
    cnsle.error = jest.fn();
    cnsle.log = jest.fn();

    const lgr = new Logger(cnsle, LOG_LEVELS.none);
    lgr.info('test');
    lgr.warning('test');
    lgr.error(new Error('test'));

    expect(cnsle.log).toHaveBeenCalledTimes(0);
    expect(cnsle.warn).toHaveBeenCalledTimes(0);
    expect(cnsle.error).toHaveBeenCalledTimes(0);

    lgr.setLogLevel(LOG_LEVELS.error);
    lgr.info('test');
    lgr.warning('test');
    lgr.error(new Error('test'));

    expect(cnsle.log).toHaveBeenCalledTimes(0);
    expect(cnsle.warn).toHaveBeenCalledTimes(0);
    expect(cnsle.error).toHaveBeenCalledTimes(1);

    lgr.setLogLevel(LOG_LEVELS.warning);
    lgr.info('test');
    lgr.warning('test');
    lgr.error(new Error('test'));

    expect(cnsle.log).toHaveBeenCalledTimes(0);
    expect(cnsle.warn).toHaveBeenCalledTimes(1);
    expect(cnsle.error).toHaveBeenCalledTimes(2);

    lgr.setLogLevel(LOG_LEVELS.info);
    lgr.info('test');
    lgr.warning('test');
    lgr.error(new Error('test'));

    expect(cnsle.log).toHaveBeenCalledTimes(1);
    expect(cnsle.warn).toHaveBeenCalledTimes(2);
    expect(cnsle.error).toHaveBeenCalledTimes(3);
  });

  it('should be automatically set to none in production', () => {
    const slf = (new Function('return this;'))();
    if (typeof slf.process === 'undefined') slf.process = {};
    if (typeof slf.process.env === 'undefined') slf.process.env = {};
    if (slf.process.env.NODE_ENV !== 'production') slf.process.env.NODE_ENV = 'production';
    const cnsle = new FakeConsole();
    const lgr = new Logger(cnsle);
    expect(lgr.getLogLevel()).toBe(LOG_LEVELS.none);
  });
});
