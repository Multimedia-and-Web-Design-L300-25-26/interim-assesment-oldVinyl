import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { environment } from "./config/environment.js";
import authRouter from "./routes/authRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import cryptoRouter from "./routes/cryptoRoutes.js";
import healthRouter from "./routes/healthRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

export const app = express();

app.use(
  cors({
    origin: environment.clientOrigin,
    credentials: true
  })
);
app.use(helmet());
app.use(morgan(environment.isProduction ? "combined" : "dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", healthRouter);
app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api", cryptoRouter);

app.use(notFoundHandler);
app.use(errorHandler);
