import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private currentLogs: { info: string | null; errors: string | null } = {
    info: null,
    errors: null,
  };

  log(message: any, ...optionalParams: any[]) {
    this.writeLogsToFile('info', 'log', message, optionalParams);
    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.writeLogsToFile('errors', 'error', message, optionalParams);
    super.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.writeLogsToFile('info', 'warn', message, optionalParams);
    super.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.writeLogsToFile('info', 'debug', message, optionalParams);
    super.debug(message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.writeLogsToFile('info', 'verbose', message, optionalParams);
    super.verbose(message, ...optionalParams);
  }

  private writeLogsToFile(
    logType: 'info' | 'errors',
    logLevel: LogLevel,
    message: any,
    optionalParams: any[],
  ) {
    const logSize = +(<string>process.env.LOGFILE_SIZE_KB);
    const logDir = path.resolve(__dirname, `../../logs/${logType}`);

    const pidMessage = this.formatPid(process.pid);
    const contextMessage = optionalParams[0] ? `[${optionalParams[0]}] ` : '';
    const formattedLogLevel = logLevel.toUpperCase();
    const formattedMessage = `${pidMessage} ${formattedLogLevel} ${contextMessage} ${message}`;

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    if (this.currentLogs[logType]) {
      const size = fs.statSync(<string>this.currentLogs[logType]).size;
      const sizeKb = Math.round(size / 1000);

      if (sizeKb >= logSize) {
        this.currentLogs[logType] = this.getLogName(logType);
      }
    } else {
      this.currentLogs[logType] = this.getLogName(logType);
    }

    fs.writeFileSync(
      <string>this.currentLogs[logType],
      `${formattedMessage}\n`,
      {
        flag: 'a',
      },
    );
  }

  private getLogName(logType: 'info' | 'errors') {
    const logDir = path.resolve(__dirname, `../../logs/${logType}`);

    return path.join(logDir, `${new Date().toISOString()}.log`);
  }
}
