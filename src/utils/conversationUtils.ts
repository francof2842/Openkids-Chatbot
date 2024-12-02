import Conversation, { IConversation } from "../models/Conversation";

export interface ChatCompletionMessageParam {
  role: "user" | "assistant";
  content: string;
}

// Save conversation to database
export async function saveConversation(
  userId: string,
  messages: Array<{ role: string; content: string }>
) {
  await Conversation.findOneAndUpdate(
    { userId },
    { userId, messages },
    { upsert: true, new: true }
  );
}

// Get conversation from database
export async function getConversation(
  userId: string
): Promise<ChatCompletionMessageParam[] | null> {
  const conversation = await Conversation.findOne({ userId });
  return conversation
    ? (conversation.messages as ChatCompletionMessageParam[])
    : null;
}
