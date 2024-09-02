import { Global, Logger, Module } from '@nestjs/common';
import { ErrorHandlerService } from './error-handler.service';

@Global()
@Module({
  providers: [ErrorHandlerService, Logger],
  exports: [ErrorHandlerService],
})
export class LoggerNestModule {}
