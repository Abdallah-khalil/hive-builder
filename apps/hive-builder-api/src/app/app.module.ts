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
      isGlobal: true,
      load: [config],
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      include: [AuthSupabaseModule, UserModule],
      playground: true,
    }),

    SupabaseNestModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        return {
          supabaseKey: configService.get<string>('supabaseKey') ?? '',
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
