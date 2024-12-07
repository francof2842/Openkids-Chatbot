import dotenv from "dotenv";
import path from "path";

// Load .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { Pinecone } from "@pinecone-database/pinecone";

// Initialize Pinecone client with API key
console.log(process.env.PINECONE_API_KEY);
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "your-pinecone-api-key",
});

export default pinecone;
