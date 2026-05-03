import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/register").get(asyncHandler(registerUser)).post(asyncHandler(registerUser));
authRouter.route("/login").get(asyncHandler(loginUser)).post(asyncHandler(loginUser));
authRouter.post("/logout", asyncHandler(logoutUser));

export default authRouter;
