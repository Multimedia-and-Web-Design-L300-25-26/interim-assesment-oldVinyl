import mongoose from "mongoose";
import { connectDatabase } from "../config/database.js";
import { validateEnvironment } from "../config/environment.js";
import { CryptoAsset } from "../models/CryptoAsset.js";

const starterAssets = [
  {
    name: "Pikachu",
    symbol: "PIKA",
    price: 1.84,
    image: "https://placehold.co/64x64/png?text=PI",
    change24h: 4.2
  },
  {
    name: "Charizard",
    symbol: "CHAR",
    price: 12.41,
    image: "https://placehold.co/64x64/png?text=CH",
    change24h: -1.1
  },
  {
    name: "Gengar",
    symbol: "GENG",
    price: 3.29,
    image: "https://placehold.co/64x64/png?text=GE",
    change24h: 0.8
  },
  {
    name: "Red Bull Racing",
    symbol: "RBR",
    price: 28.7,
    image: "https://placehold.co/64x64/png?text=RB",
    change24h: 6.4
  },
  {
    name: "Ferrari",
    symbol: "FER",
    price: 25.18,
    image: "https://placehold.co/64x64/png?text=FE",
    change24h: -2.2
  },
  {
    name: "McLaren",
    symbol: "MCL",
    price: 19.63,
    image: "https://placehold.co/64x64/png?text=MC",
    change24h: 1.9
  },
  {
    name: "Hamilton",
    symbol: "HAM",
    price: 14.52,
    image: "https://placehold.co/64x64/png?text=LH",
    change24h: -0.6
  },
  {
    name: "Verstappen",
    symbol: "VER",
    price: 16.07,
    image: "https://placehold.co/64x64/png?text=MV",
    change24h: 3.3
  },
  {
    name: "Athena",
    symbol: "ATH",
    price: 9.21,
    image: "https://placehold.co/64x64/png?text=AT",
    change24h: 2.7
  },
  {
    name: "Apollo",
    symbol: "APO",
    price: 7.85,
    image: "https://placehold.co/64x64/png?text=AP",
    change24h: -0.3
  },
  {
    name: "Hades",
    symbol: "HAD",
    price: 6.19,
    image: "https://placehold.co/64x64/png?text=HA",
    change24h: 5.1
  },
  {
    name: "Juno",
    symbol: "JUNO",
    price: 4.44,
    image: "https://placehold.co/64x64/png?text=JU",
    change24h: 1.2
  }
];

const seed = async () => {
  validateEnvironment();
  await connectDatabase();

  await CryptoAsset.deleteMany({});
  await CryptoAsset.insertMany(starterAssets);

  console.log(`Seed complete. Added ${starterAssets.length} assets.`);
  await mongoose.connection.close();
};

seed().catch(async (seedError) => {
  console.error("Seed failed", seedError);
  await mongoose.connection.close();
  process.exit(1);
});
