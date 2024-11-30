import { IMessage } from "../models/Message";
import { saveMessage } from "../repositories/messageRepository";

export const processMessage = async (
  message: IMessage
): Promise<{ message: string }> => {
  await saveMessage(message);
  return { message: "Message received and logged" };
};
