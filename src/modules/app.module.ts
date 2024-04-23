import { TypeormModuleOptions } from '@/common/config/typeorm-module-options.config';
import { ThrottlerBehindProxyGuard } from '@/common/guards/throttler-behind-proxy.guard';
import {
	ENV_THROTTLER_LIMIT,
	ENV_THROTTLER_TTL,
} from '@/constants/env-keys.const';
import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/providers/app.service';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [`${__dirname}/../../.${process.env.NODE_ENV}.env`],
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync(TypeormModuleOptions),
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (config: ConfigService) => [
				{
					ttl: config.get<number>(ENV_THROTTLER_TTL, { infer: true }),
					limit: config.get<number>(ENV_THROTTLER_LIMIT, { infer: true }),
				},
			],
		}),
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerBehindProxyGuard,
		},
	],
})
export class AppModule {}
