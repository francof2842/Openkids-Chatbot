import pinecone from "../utils/pineconeClient";
import { OpenAI } from "openai";
import fs from "fs";

async function uploadKnowledgeBase() {
  const indexName = "knowledge-base";

  // Delete the index if it exists
  /*   try {
    console.log(`Deleting index "${indexName}" if it exists...`);
    await pinecone.deleteIndex(indexName);
    console.log(`Index "${indexName}" deleted successfully.`);
    // Add a delay to ensure the index is fully deleted
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 5-second delay
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log(`Index "${indexName}" does not exist. Skipping deletion.`);
    } else {
      console.error("Error deleting index:", error.message);
      return;
    }
  } */

  // Recreate the index
  try {
    await pinecone.createIndex({
      name: indexName,
      dimension: 1536,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });
    console.log(`Index "${indexName}" created successfully.`);
  } catch (error) {
    console.error("Error creating index:", error);
    return;
  }

  // Get the index
  const index = pinecone.Index(indexName);

  // Load knowledge base content
  const knowledgeBase = fs.readFileSync("./knowledgeBase.txt", "utf-8");
  const entries = knowledgeBase.split("\n").filter((line) => line.trim());

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "your-openai-api-key",
  });

  // Generate embeddings and upload to Pinecone
  for (const [id, entry] of entries.entries()) {
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: entry,
      });

      const embedding = embeddingResponse.data[0].embedding;

      // Upsert embedding into Pinecone
      await index.upsert([
        {
          id: `entry-${id}`,
          values: embedding,
          metadata: { content: entry },
        },
      ]);

      console.log(`Uploaded entry ${id}: ${entry}`);
    } catch (err) {
      console.error(`Error uploading entry ${id}:`, err);
    }
  }
}

uploadKnowledgeBase().catch((err) =>
  console.error("Error uploading knowledge base:", err)
);
