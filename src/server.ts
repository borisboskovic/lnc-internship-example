import express from "express";
import morgan from "morgan";
import { Logger } from "./utils/logger";
import { errorMiddleware } from "./middleware/error-middleware";
import { ExampleRouter } from "./routers/example";

const PORT = 8062;

const app = express();

app.use(morgan("dev"));

app.use("/example", ExampleRouter);

app.use(errorMiddleware);

app.listen(PORT, () => Logger.info(`App is listening on port: ${PORT}`));
