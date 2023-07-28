export class HttpException extends Error {
	status?: number;
	errors?: unknown[];

	constructor(status: number, message: string) {
		super();
		this.message = message;
		this.status = status;
	}
}
