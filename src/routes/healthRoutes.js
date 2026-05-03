import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/health", (request, response) => {
  return response.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString()
  });
});

export default healthRouter;
