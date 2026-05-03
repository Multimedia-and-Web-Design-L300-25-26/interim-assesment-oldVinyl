import { CryptoAsset } from "../models/CryptoAsset.js";

const getRequestValue = (request, key) => {
  if (request.body?.[key] !== undefined) return request.body[key];
  if (request.query?.[key] !== undefined) return request.query[key];
  return undefined;
};

const parseNumericValue = (value) => {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : NaN;
};

const validateImageUrl = (value) => {
  try {
    const validatedUrl = new URL(value);
    return ["http:", "https:"].includes(validatedUrl.protocol);
  } catch {
    return false;
  }
};

export const getAllCryptocurrencies = async (request, response) => {
  const allAssets = await CryptoAsset.find().sort({ createdAt: -1 });

  return response.status(200).json({
    success: true,
    message: "All cryptocurrencies fetched successfully",
    count: allAssets.length,
    data: allAssets
  });
};

export const getTopGainers = async (request, response) => {
  const topGainers = await CryptoAsset.find().sort({ change24h: -1, createdAt: -1 });

  return response.status(200).json({
    success: true,
    message: "Top gainers fetched successfully",
    count: topGainers.length,
    data: topGainers
  });
};

export const getNewListings = async (request, response) => {
  const newestAssets = await CryptoAsset.find().sort({ createdAt: -1 });

  return response.status(200).json({
    success: true,
    message: "New listings fetched successfully",
    count: newestAssets.length,
    data: newestAssets
  });
};

export const createCryptocurrency = async (request, response) => {
  const name = String(getRequestValue(request, "name") || "").trim();
  const symbol = String(getRequestValue(request, "symbol") || "").trim().toUpperCase();
  const image = String(getRequestValue(request, "image") || "").trim();
  const price = parseNumericValue(getRequestValue(request, "price"));
  const change24h = parseNumericValue(getRequestValue(request, "change24h"));

  if (!name || !symbol || !image || Number.isNaN(price) || Number.isNaN(change24h)) {
    return response.status(400).json({
      success: false,
      message: "Name, symbol, price, image, and change24h are required"
    });
  }

  if (price < 0) {
    return response.status(400).json({
      success: false,
      message: "Price cannot be negative"
    });
  }

  if (!validateImageUrl(image)) {
    return response.status(400).json({
      success: false,
      message: "Image must be a valid http or https URL"
    });
  }

  const createdAsset = await CryptoAsset.create({
    name,
    symbol,
    price,
    image,
    change24h
  });

  return response.status(201).json({
    success: true,
    message: "Cryptocurrency created successfully",
    data: createdAsset
  });
};
