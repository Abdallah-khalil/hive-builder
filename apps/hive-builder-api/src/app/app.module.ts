import { join } from 'path';

import { AuthSupabaseModule, UserModule } from '@hive-builder/auth/server';
import {
  HttpExceptionFilter,
  LoggerNestModule,
  SupabaseNestModule,
} from '@hive-builder/core-server';
import { StripeNestModule } from '@hive-builder/payment-server';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from './config';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [config],
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(
        process.cwd(),
        'apps/hive-builder-api/src/app/schema.gql',
      ),
      driver: ApolloDriver,
      include: [AuthSupabaseModule, UserModule],
      playground: true,
    }),

    SupabaseNestModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        return {
          supabaseKey: configService.get<string>('supabaseServiceKey') ?? '',
          supabaseUrl: configService.get<string>('supabaseUrl') ?? '',
        };
      },
    }),

    StripeNestModule,
    AuthSupabaseModule,
    UserModule,
    LoggerNestModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: (logger: Logger) => new HttpExceptionFilter(logger),
      inject: [Logger],
    },

    Logger,
  ],
})
export class AppModule {}
