import { Router } from "express";
import { HttpException } from "../utils/HttpException";

const router = Router({ mergeParams: true });

router.get("/healthcheck", (req, res) => {
	if (req.query.willError === "true") {
		throw new HttpException(401, "You are not authenticated");
	}
	res.json({ message: "App is listening on port 8062" });
});

router.get("/asynchandler", async (req, res, next) => {
	if (req.query.type === "promise") {
		const doSomething = async () => {
			throw new HttpException(500, "Async errored");
		};

		await doSomething().catch((error) => {
			next(error);
		});
	}

	if (req.query.type === "normal") {
		return next(new HttpException(501, "Not implemented"));
	}

	if (!res.headersSent) res.json({ message: "Async working as expected" });
});

export const ExampleRouter = router;
