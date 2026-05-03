import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createCryptocurrency,
  getAllCryptocurrencies,
  getNewListings,
  getTopGainers
} from "../controllers/cryptoController.js";

const cryptoRouter = Router();

cryptoRouter.get("/crypto", asyncHandler(getAllCryptocurrencies));
cryptoRouter.get("/crypto/gainers", asyncHandler(getTopGainers));
cryptoRouter.get("/crypto/new", asyncHandler(getNewListings));
cryptoRouter.post("/crypto", asyncHandler(createCryptocurrency));

export default cryptoRouter;
