import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getAuthenticatedProfile } from "../controllers/profileController.js";
import { authenticateRequest } from "../middleware/authenticate.js";

const profileRouter = Router();

profileRouter.get("/profile", authenticateRequest, asyncHandler(getAuthenticatedProfile));

export default profileRouter;
