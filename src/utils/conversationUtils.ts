import Conversation, { IConversation } from "../models/Conversation";

export interface ChatCompletionMessageParam {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Save conversation to database
export async function saveConversation(
  userId: string,
  messages: Array<{ role: string; content: string; timestamp: Date }>
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

export async function getRecentConversation(
  userId: string
): Promise<ChatCompletionMessageParam[] | null> {
  const conversation = await Conversation.findOne({ userId });

  if (!conversation) {
    return null; // No conversation found
  }

  // Calculate the timestamp for 24 hours ago
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Filter messages within the last 24 hours
  const recentMessages = conversation.messages.filter(
    (message): message is ChatCompletionMessageParam =>
      new Date(message.timestamp) >= twentyFourHoursAgo &&
      (message.role === "user" || message.role === "assistant")
  );

  if (recentMessages.length === 0) {
    return null; // No messages in the last 24 hours
  }

  return recentMessages ? recentMessages : null;
}
