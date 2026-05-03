import { User } from "../models/User.js";
import { environment } from "../config/environment.js";
import { generateUserToken } from "../utils/token.js";

const getRequestValue = (request, key) => {
  if (request.body?.[key] !== undefined) return request.body[key];
  if (request.query?.[key] !== undefined) return request.query[key];
  return undefined;
};

const createCookieOptions = () => ({
  httpOnly: true,
  secure: environment.cookieSecure || environment.isProduction,
  sameSite: environment.isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

export const registerUser = async (request, response) => {
  const name = String(getRequestValue(request, "name") || "").trim();
  const email = String(getRequestValue(request, "email") || "").trim().toLowerCase();
  const password = String(getRequestValue(request, "password") || "");

  if (!name || !email || !password) {
    return response.status(400).json({
      success: false,
      message: "Name, email, and password are required"
    });
  }

  if (password.length < 6) {
    return response.status(400).json({
      success: false,
      message: "Password must be at least 6 characters"
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return response.status(409).json({
      success: false,
      message: "An account with this email already exists"
    });
  }

  const passwordHash = await User.hashPassword(password);
  const createdUser = await User.create({ name, email, passwordHash });
  const signedToken = generateUserToken(createdUser.id);

  response.cookie(environment.cookieName, signedToken, createCookieOptions());

  return response.status(201).json({
    success: true,
    message: "Account created successfully",
    token: signedToken,
    user: createdUser
  });
};

export const loginUser = async (request, response) => {
  const email = String(getRequestValue(request, "email") || "").trim().toLowerCase();
  const password = String(getRequestValue(request, "password") || "");

  if (!email || !password) {
    return response.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return response.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  const passwordIsCorrect = await existingUser.verifyPassword(password);
  if (!passwordIsCorrect) {
    return response.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  const signedToken = generateUserToken(existingUser.id);
  response.cookie(environment.cookieName, signedToken, createCookieOptions());

  return response.status(200).json({
    success: true,
    message: "Login successful",
    token: signedToken,
    user: existingUser
  });
};

export const logoutUser = async (request, response) => {
  response.clearCookie(environment.cookieName, {
    httpOnly: true,
    secure: environment.cookieSecure || environment.isProduction,
    sameSite: environment.isProduction ? "none" : "lax"
  });

  return response.status(200).json({
    success: true,
    message: "Logout successful"
  });
};
