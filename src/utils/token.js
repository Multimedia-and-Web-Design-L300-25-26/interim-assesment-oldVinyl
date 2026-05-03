import jwt from "jsonwebtoken";
import { environment } from "../config/environment.js";

export const generateUserToken = (userId) => {
  return jwt.sign({ userId }, environment.jwtSecret, {
    expiresIn: environment.jwtExpiresIn
  });
};

export const verifyUserToken = (token) => {
  return jwt.verify(token, environment.jwtSecret);
};
