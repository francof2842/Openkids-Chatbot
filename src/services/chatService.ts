import OpenAI from "openai";
import { saveConversation, getConversation } from "../utils/conversationUtils";
import { ChatCompletionMessageParam } from "../utils/conversationUtils";

export async function chatWithUser(userId: string, userInput: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  // Retrieve conversation history
  const existingConversation = await getConversation(userId);
  const conversationHistory: ChatCompletionMessageParam[] =
    existingConversation || [];

  // Add user's message to conversation history
  conversationHistory.push({ role: "user", content: userInput });

  // Send request to OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: conversationHistory,
  });

  const assistantMessage = response.choices[0].message.content;

  if (assistantMessage) {
    // Add assistant's message to conversation history
    conversationHistory.push({ role: "assistant", content: assistantMessage });
  }

  // Save updated conversation history to the database
  await saveConversation(userId, conversationHistory);

  return assistantMessage;
}
