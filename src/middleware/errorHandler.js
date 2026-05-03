export const notFoundHandler = (request, response) => {
  return response.status(404).json({
    success: false,
    message: `Route not found: ${request.method} ${request.originalUrl}`
  });
};

export const errorHandler = (error, request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  if (error.name === "ValidationError") {
    const validationMessages = Object.values(error.errors).map((singleError) => singleError.message);
    return response.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validationMessages
    });
  }

  if (error.code === 11000) {
    return response.status(409).json({
      success: false,
      message: "A record with this unique value already exists"
    });
  }

  return response.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "An unexpected server error occurred"
  });
};
