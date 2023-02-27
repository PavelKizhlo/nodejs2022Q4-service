import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    this.loggingService.setContext('LoggingInterceptor');
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method, url, body, query } = req;
    const { statusCode } = res;
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.loggingService.log(
            `${method} ${url} query: ${JSON.stringify(
              query,
            )} body: ${JSON.stringify(
              body,
            )} status: ${statusCode}, responseTime: ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
