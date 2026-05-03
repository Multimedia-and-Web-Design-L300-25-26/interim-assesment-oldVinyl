export const getAuthenticatedProfile = async (request, response) => {
  const authenticatedUser = request.user;

  return response.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    profile: {
      id: authenticatedUser.id,
      name: authenticatedUser.name,
      email: authenticatedUser.email,
      createdAt: authenticatedUser.createdAt,
      updatedAt: authenticatedUser.updatedAt
    }
  });
};
