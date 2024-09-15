import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthError, PostgrestError } from '@supabase/supabase-js';

@Injectable()
export class ErrorHandlerService {
  public constructor(private readonly logger: Logger) {}

  public handleError(error: PostgrestError | AuthError | Error) {
    this.logger.error('supabase error', error);
    throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
  }
}
