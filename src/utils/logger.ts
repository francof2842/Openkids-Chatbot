import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "warn" : "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

// Add a separate transport for error logs
const errorLogger = createLogger({
  level: "error",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [new transports.File({ filename: "logs/error.log" })],
});

export { logger, errorLogger };
