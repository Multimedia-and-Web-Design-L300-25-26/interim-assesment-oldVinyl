import mongoose from "mongoose";
import { environment } from "./environment.js";

export const connectDatabase = async () => {
  await mongoose.connect(environment.mongodbUri, {
    autoIndex: true
  });
};
