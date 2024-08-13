import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { config } from './config';
import { SupabaseNestModule } from '@hive-builder/core-server';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),

    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    SupabaseNestModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        supabaseKey: configService.get<string>('supabaseKey') ?? '',
        supabaseUrl: configService.get<string>('supabaseUrl') ?? '',
      }),
    }),
  ],
  providers: [],
})
export class AppModule {}
