import {
	ENV_DB_DATABASE,
	ENV_DB_HOST,
	ENV_DB_PASSWORD,
	ENV_DB_PORT,
	ENV_DB_SYNCHRONIZE,
	ENV_DB_TYPE,
	ENV_DB_USERNAME,
	ENV_NODE_ENV,
} from '@/constants/env-keys.const';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const TypeormModuleOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => {
		const NODE_ENV = configService.get(ENV_NODE_ENV);

		const option = {
			type: configService.get(ENV_DB_TYPE),
			host: configService.get(ENV_DB_HOST),
			port: Number(configService.get<number>(ENV_DB_PORT)),
			username: configService.get(ENV_DB_USERNAME),
			database: configService.get(ENV_DB_DATABASE),
			password: configService.get(ENV_DB_PASSWORD),
			entities: [__dirname + '/../../**/*.entity.{js,ts}'],
			synchronize: configService.get<boolean>(ENV_DB_SYNCHRONIZE),
			ssl: NODE_ENV === 'development' ? '' : { rejectUnauthorized: false },
			...(NODE_ENV === 'development'
				? { retryAttempts: 10, logging: true }
				: { logging: false }),
		};

		return option;
	},
};
