import dotenv from "dotenv";

dotenv.config();

const toBoolean = (value, fallback = false) => {
  if (value === undefined) return fallback;
  return String(value).toLowerCase() === "true";
};

export const environment = {
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  cookieName: process.env.COOKIE_NAME || "authToken",
  cookieSecure: toBoolean(process.env.COOKIE_SECURE, false),
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  isProduction: process.env.NODE_ENV === "production"
};

export const validateEnvironment = () => {
  const missingRequiredKeys = [];

  if (!environment.mongodbUri) missingRequiredKeys.push("MONGODB_URI");
  if (!environment.jwtSecret) missingRequiredKeys.push("JWT_SECRET");

  if (missingRequiredKeys.length > 0) {
    throw new Error(`Missing environment variables: ${missingRequiredKeys.join(", ")}`);
  }
};
