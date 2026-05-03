import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { environment, validateEnvironment } from "./config/environment.js";

const startServer = async () => {
  validateEnvironment();
  await connectDatabase();

  app.listen(environment.port, () => {
    console.log(`Server is running on port ${environment.port}`);
  });
};

startServer().catch((startupError) => {
  console.error("Failed to start server", startupError);
  process.exit(1);
});
