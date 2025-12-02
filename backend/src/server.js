require("dotenv").config();

const { error } = require("console");
const app = require("./app");
const logger = require("./utils/logger");
const sequelize = require("./config/sequelize");
process.on("uncaughtException", (err) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  logger.error(err.name, err.message);
  logger.error(err.stack);
  process.exit(1);
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection has been established successfully.");

    if (
      process.env.NODE_ENV === "development" &&
      process.env.DB_SYNC === "true"
    ) {
      await sequelize.sync({ alter: true });
      logger.info(
        "Database tables synchronized successfully (preserving data)."
      );
    }
  } catch (err) {
    logger.error("Unable to connect to the database:", error);
    logger.error("Error details: ", error.message);
    logger.error("Stack trace", error.stack);
    process.exit(1);
  }
};
const StartServer = async () => {
    await connectDB()
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    logger.info(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT} `
    );
  });

  process.on("unhandledRejection", (err) => {
    logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
    logger.error(err.name, err.message);
    logger.error(err.stack);
    process.exit(1);
  });

  process.on("SIGTERM", () => {
    logger.info("👋 SIGTERM RECEIVED. Shutting down gracefully");
    Server.close(() => {
      logger.info("💥 Process terminated!");
    });
  });
};
StartServer();
