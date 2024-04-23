import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { NestFactory } from '@nestjs/core';

import { CorsConfig } from './common/config/cors.config';
import {
	ENV_APPLICATION_PORT,
	ENV_SECRET_COOKIE_KEY,
} from './constants/env-keys.const';
import { AppModule } from './modules/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// cors
	app.enableCors(CorsConfig);

	// cookie parser
	app.use(cookieParser(ENV_SECRET_COOKIE_KEY));

	// helmet
	app.use(helmet());

	await app.listen(ENV_APPLICATION_PORT);
}
bootstrap();
