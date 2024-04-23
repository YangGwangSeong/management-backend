import cookieParser from 'cookie-parser';
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

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.set('trust proxy', true);

	// cors
	app.enableCors(CorsConfig);

	// cookie parser
	app.use(cookieParser(ENV_SECRET_COOKIE_KEY));

	// helmet
	app.use(helmet());

	// set global prefix
	app.setGlobalPrefix(ENV_GLOBAL_PREFIX);

	await app.listen(ENV_APPLICATION_PORT);
}
bootstrap();
