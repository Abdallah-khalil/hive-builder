import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthError, PostgrestError } from '@supabase/supabase-js';

@Injectable()
export class ErrorHandlerService {
  public constructor(private readonly logger: Logger) {}

  public handleError(error: PostgrestError | AuthError) {
    this.logger.error('supabase create user error', error);
    throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
  }
}
