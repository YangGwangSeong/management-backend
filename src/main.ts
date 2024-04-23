import { NestFactory } from '@nestjs/core';

import { CorsConfig } from './common/config/cors.config';
import { ENV_APPLICATION_PORT } from './constants/env-keys.const';
import { AppModule } from './modules/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// cors
	app.enableCors(CorsConfig);

	await app.listen(ENV_APPLICATION_PORT);
}
bootstrap();
