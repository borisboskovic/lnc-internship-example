import { ErrorRequestHandler } from "express";
import { HttpException } from "../utils/HttpException";
import { Logger } from "../utils/logger";
import prettier from "prettier";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	const status =
		err instanceof HttpException && err.status ? err.status : 500;
	const message =
		err instanceof Error ? err.message : "Internal Server Error";
	const name = err?.name ?? "Error";

	const requestData = {
		method: req.method,
		url: req.url,
		body: req.body,
		query: req.query,
		params: req.params,
		headers: req.headers,
	};

	prettier
		.format(JSON.stringify(requestData), {
			parser: "json",
			tabWidth: 4,
		})
		.then((result) => {
			const prefixed = result
				.split("\n")
				.map((l) => "    " + l)
				.join("\n");

			Logger.error(`${err.stack}\n\tRequest:\n${prefixed}`);
		})
		.catch(() => Logger.error(err.stack));

	res.status(status).json({
		status,
		name,
		message,
		errors: err.errors,
	});
};
