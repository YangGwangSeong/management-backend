import { Observable, map } from 'rxjs';

import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';

export interface SucessResponse<T> {
	data: T;
	success?: boolean;
}

@Injectable()
export class SuccessInterceptor<T>
	implements NestInterceptor<T, SucessResponse<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<SucessResponse<T>> {
		return next.handle().pipe(
			map((data) => {
				//const request = context.switchToHttp().getRequest();
				//const response = context.switchToHttp().getResponse();
				//const statusCode = response.statusCode || 200;

				return {
					success: true,
					data,
				};
			}),
		);
	}
}
