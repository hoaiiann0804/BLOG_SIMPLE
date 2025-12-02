const winstom = require("winston");

const logFormat = winstom.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level} ${message}`;
});

const logger = winstom.createLogger({
  level: process.env.NODE_ENV || "development" ? "debug" : "info",
  format: winstom.format.combine(
    winstom.format.timestamp({ format: "YY-MM-DD HH:mm:ss" }),
    winstom.format.errors({ stack: true }),
    winstom.format.splat(),
    logFormat
  ),
  defaultMeta: { service: "api" },
  transports: [
    new winstom.transports.Console({
      format: winstom.format.combine(
        winstom.format.colorize(),
        winstom.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" })
      ),
    }),
    new winstom.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5242880,
      maxFiles: 5,
    }),

    new winstom.transports.File({
        filename: "logs/combined.log",
        maxsize: 5242880,
        maxFiles: 5
    })
  ],
});

module.exports = logger;
