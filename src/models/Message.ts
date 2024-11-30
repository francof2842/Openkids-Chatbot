import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
  from: string;
  to: string;
  message: string;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default model<IMessage>("Message", MessageSchema);
