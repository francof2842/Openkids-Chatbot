import OpenAI from "openai";
import {
  saveConversation,
  getRecentConversation,
} from "../utils/conversationUtils";
import redisClient from "../utils/redisClient";
import { ChatCompletionMessageParam } from "../utils/conversationUtils";
import { systemMessageContent, knowledgeBase } from "../utils/rules";
import { logger } from "../utils/logger";

export async function chatWithUser(userId: string, userInput: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const cacheKey = `conversation:${userId}`;

  let conversationHistory = JSON.parse(
    (await redisClient.get(cacheKey)) || "[]"
  );

  logger.info("Conversation history with Redis");
  logger.info(conversationHistory);

  if (conversationHistory.length === 0) {
    // If not in Redis, retrieve from the database
    const recentConversation = await getRecentConversation(userId);
    conversationHistory = recentConversation || [];
  } else {
    conversationHistory = conversationHistory.slice(-4);
  }

  // Build the full history including rules
  const fullHistory: ChatCompletionMessageParam[] = [
    {
      role: "assistant",
      content: `Sigue estas reglas SIEMPRE: ${systemMessageContent} y usa este documento para ayudarte: ${knowledgeBase}`,
      timestamp: new Date(),
    },
    ...(conversationHistory ? conversationHistory : []),
    { role: "user", content: userInput, timestamp: new Date() },
  ];

  // Send request to OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: fullHistory,
  });

  const assistantMessage = response.choices[0].message.content;

  if (assistantMessage) {
    // Add assistant's message to conversation history
    conversationHistory.push({
      role: "assistant",
      content: assistantMessage,
      timestamp: new Date(),
    });
  }

  // Save the conversation to Redis and database
  await redisClient.set(cacheKey, JSON.stringify(conversationHistory), {
    EX: 3600,
  }); // Cache for 1 hour
  await saveConversation(userId, conversationHistory);

  return assistantMessage;
}
