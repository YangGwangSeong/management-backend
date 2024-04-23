import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/providers/app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [`${__dirname}/../../.${process.env.NODE_ENV}.env`],
			isGlobal: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
