import { join } from 'path';

import { AuthSupabaseModule, UserModule } from '@hive-builder/auth/server';
import { SupabaseNestModule } from '@hive-builder/core-server';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

    AuthSupabaseModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
