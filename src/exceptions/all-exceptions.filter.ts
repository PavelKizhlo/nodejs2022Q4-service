import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { LoggingService } from '../logging/logging.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private httpAdapter: AbstractHttpAdapter,
    private loggingService: LoggingService,
  ) {
    super(httpAdapter);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host);

    this.loggingService.setContext('ExceptionFilter');

    const req = host.switchToHttp().getRequest();
    const res = host.switchToHttp().getResponse();
    const { method, url, body, query } = req;
    const { statusCode } = res;
    const now = Date.now();

    this.loggingService.warn(
      `${method} ${url} query: ${JSON.stringify(query)} body: ${JSON.stringify(
        body,
      )} status: ${statusCode}, responseTime: ${Date.now() - now}ms`,
    );
  }
}
