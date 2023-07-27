import express from "express";
import morgan from "morgan";
import { Logger } from "./utils/logger";

const PORT = 8062;

const app = express();

app.use(morgan("dev"));

app.get("/healthcheck", (req, res) => {
	res.json({ message: "App is listening on port 8062" });
});

app.listen(PORT, () => Logger.info(`App is listening on port: ${PORT}`));
