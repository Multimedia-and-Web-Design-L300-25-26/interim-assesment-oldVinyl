import { User } from "../models/User.js";
import { environment } from "../config/environment.js";
import { verifyUserToken } from "../utils/token.js";

const readBearerToken = (authorizationHeader = "") => {
  if (!authorizationHeader.toLowerCase().startsWith("bearer ")) {
    return null;
  }
  return authorizationHeader.slice(7).trim();
};

export const authenticateRequest = async (request, response, next) => {
  const cookieToken = request.cookies?.[environment.cookieName];
  const bearerToken = readBearerToken(request.headers.authorization);
  const providedToken = cookieToken || bearerToken;

  if (!providedToken) {
    return response.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  try {
    const decodedToken = verifyUserToken(providedToken);
    const authenticatedUser = await User.findById(decodedToken.userId);

    if (!authenticatedUser) {
      return response.status(401).json({
        success: false,
        message: "Invalid authentication token"
      });
    }

    request.user = authenticatedUser;
    return next();
  } catch {
    return response.status(401).json({
      success: false,
      message: "Authentication token has expired or is invalid"
    });
  }
};
