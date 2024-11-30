import Message, { IMessage } from "../models/Message";
import { logger } from "../utils/logger";

export const saveMessage = async (message: IMessage): Promise<IMessage> => {
  logger.info("Repository initialized");
  const newMessage = new Message(message);
  return await newMessage.save();
};
