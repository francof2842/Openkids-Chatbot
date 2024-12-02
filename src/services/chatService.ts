import OpenAI from "openai";
import {
  saveConversation,
  getConversation,
  getRecentConversation,
} from "../utils/conversationUtils";
import { ChatCompletionMessageParam } from "../utils/conversationUtils";
import { logger } from "../utils/logger";

export async function chatWithUser(userId: string, userInput: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Retrieve conversation history (only last 24 hours)
  const recentConversation = await getRecentConversation(userId);
  const conversationHistory: ChatCompletionMessageParam[] = recentConversation
    ? recentConversation
    : [
        {
          role: "assistant",
          content: "You are a helpful assistant.",
          timestamp: new Date(),
        }, // New conversation starter
      ];

  // Add user's message to conversation history
  logger.info(`userInput: ${userInput}`);
  conversationHistory.push({
    role: "user",
    content: userInput,
    timestamp: new Date(),
  });

  // Send request to OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: conversationHistory,
  });

  logger.info(`response: `);
  logger.info(response);

  const assistantMessage = response.choices[0].message.content;

  if (assistantMessage) {
    logger.info(`assistantMessage: ${assistantMessage}`);
    // Add assistant's message to conversation history
    conversationHistory.push({
      role: "assistant",
      content: assistantMessage,
      timestamp: new Date(),
    });
  }

  // Save updated conversation history to the database
  await saveConversation(userId, conversationHistory);

  return assistantMessage;
}
