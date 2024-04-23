import path from 'path';

import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { CorsConfig } from './common/config/cors.config';
import {
	ENV_APPLICATION_PORT,
	ENV_GLOBAL_PREFIX,
	ENV_SECRET_COOKIE_KEY,
} from './constants/env-keys.const';
import { AppModule } from './modules/app.module';

dotenv.config({
	path: path.resolve(
		process.env.NODE_ENV === 'production'
			? '.production.env'
			: process.env.NODE_ENV === 'stage'
				? '.stage.env'
				: '.development.env',
	),
});
async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.set('trust proxy', true);

	// cors
	app.enableCors(CorsConfig);

	// cookie parser
	app.use(cookieParser(process.env[ENV_SECRET_COOKIE_KEY]));

	// helmet
	app.use(helmet());

	// set global prefix
	app.setGlobalPrefix(String(process.env[ENV_GLOBAL_PREFIX]));

	await app.listen(Number(process.env[ENV_APPLICATION_PORT]));
}
bootstrap();
