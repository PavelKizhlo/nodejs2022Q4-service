import { Global, Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LoggingInterceptor } from './logging.interceptor';

@Global()
@Module({
  providers: [LoggingService, LoggingInterceptor],
  exports: [LoggingService],
})
export class LoggingModule {}
