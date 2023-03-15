import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggingService } from '../logging/logging.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private httpAdapter: AbstractHttpAdapter,
    private loggingService: LoggingService,
  ) {
    super(httpAdapter);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    this.loggingService.setContext('ExceptionFilter');

    const context = host.switchToHttp();
    const req = context.getRequest<Request>();
    const res = context.getResponse<Response>();
    const { method, url, body, query } = req;
    const now = Date.now();
    let httpStatus;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();

      this.loggingService.warn(
        `${method} ${url} query: ${JSON.stringify(
          query,
        )} body: ${JSON.stringify(body)} status: ${httpStatus}, responseTime: ${
          Date.now() - now
        }ms`,
      );
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      const reason = exception instanceof Error ? exception.message : '';

      this.loggingService.error(
        `${method} ${url} query: ${JSON.stringify(
          query,
        )} body: ${JSON.stringify(body)} status: ${httpStatus}, responseTime: ${
          Date.now() - now
        }ms${reason ? ' REASON: ' : ''}${reason}`,
      );
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: req.url,
    };

    this.httpAdapter.reply(res, responseBody, httpStatus);
  }
}
