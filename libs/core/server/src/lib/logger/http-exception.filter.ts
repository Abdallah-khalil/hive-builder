import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  public constructor(private readonly logger: Logger) {}

  public catch(exception: HttpException | GraphQLError, host: ArgumentsHost) {
    const gqlHost: GqlArgumentsHost = GqlArgumentsHost.create(host);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = gqlHost?.getContext();

    if (ctx?.req === null) {
      ctx = host.switchToHttp();
    }

    if (ctx?.req !== null) {
      const request: Request = ctx.req;

      let status: number = HttpStatus.AMBIGUOUS;
      let message: string = '';

      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const response: string | object = exception.getResponse();
        message =
          typeof response === 'string'
            ? response
            : (response as { message: string }).message || exception.message;
      } else if (exception instanceof GraphQLError) {
        status =
          (exception.extensions as { code: number })?.code ||
          HttpStatus.INTERNAL_SERVER_ERROR;
        message = exception.message;
      }

      this.logger.error(
        `${message} - Status: ${status} - Path: ${ctx.req.body.operationName}`,
      );
      // Return a formatted error response
      return new GraphQLError(message, {
        extensions: {
          code: status,
          path:
            gqlHost.getInfo<{ fieldName: string }>().fieldName || request.url,
          timestamp: new Date().toISOString(),
        },
      });
    }

    return exception;
  }
}
