import OpenAI from "openai";
import {
  saveConversation,
  getRecentConversation,
} from "../utils/conversationUtils";
import { ChatCompletionMessageParam } from "../utils/conversationUtils";
import { systemMessageContent, knowledgeBase } from "../utils/rules";

export async function chatWithUser(userId: string, userInput: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Retrieve conversation history (only last 24 hours)
  const recentConversation = await getRecentConversation(userId);

  // Start with the system message and recent conversation or a blank slate
  let conversationHistory: ChatCompletionMessageParam[] = [
    {
      role: "assistant",
      content: `Sigue estas reglas SIEMPRE: ${systemMessageContent} y usa este documento para ayudarte: ${knowledgeBase}`,
      timestamp: new Date(),
    },
    ...(recentConversation ? recentConversation : []),
  ];

  // Add user's message to conversation history
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

  const assistantMessage = response.choices[0].message.content;

  if (assistantMessage) {
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
