import { IMessage } from "../models/Message";
import { saveMessage } from "../repositories/messageRepository";
import { logger } from "../utils/logger";

export const processMessage = async (
  message: IMessage
): Promise<{ message: string }> => {
  logger.info("Service initialized");
  await saveMessage(message);
  return { message: "Message received and logged" };
};
