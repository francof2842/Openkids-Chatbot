import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
  userId: string; // To uniquely identify the user
  messages: Array<{ role: string; content: string; timestamp: Date }>; // Stores the chat history
}

const ConversationSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  messages: [
    {
      role: {
        type: String,
        enum: ["system", "user", "assistant"],
        required: true,
      },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);
