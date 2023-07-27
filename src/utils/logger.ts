import path from "path";
import fs from "fs";
import { format } from "date-fns";
import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const logDir: string = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

export const Logger = winston.createLogger({
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		http: 4,
		debug: 4,
	},
	transports: [
		new winston.transports.Console({
			format: winston.format.colorize({
				all: true,
				colors: {
					error: "red",
					warn: "yellow",
					info: "bold cyan",
					http: "magenta",
					debug: "blueBG",
				},
			}),
			level: "debug",
		}),
		new winstonDaily({
			level: "error",
			dirname: path.join(logDir, "error"),
			filename: "%DATE%.log",
			maxFiles: 30,
		}),
		new winstonDaily({
			level: "debug",
			dirname: path.join(logDir, "debug"),
			filename: "%DATE%.log",
			frequency: "1h",
			maxFiles: 10,
			datePattern: "YYYY-MM-DD__HH-00",
		}),
	],
	format: winston.format.combine(
		winston.format.timestamp({ format: "HH:mm:ss" }),
		winston.format.printf(
			({ level, message, timestamp }) =>
				`${timestamp} - ${level.toUpperCase()}: ${message}`
		)
	),
});
