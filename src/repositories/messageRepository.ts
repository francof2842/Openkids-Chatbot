import Message, { IMessage } from "../models/Message";
import { logger } from "../utils/logger";

const create = async (messageData: { sender: string; text: string }) => {
  logger.info("---------Creating new message---------");
  logger.info("Message data:", messageData);
  const message = new Message(messageData);
  await message.save();
};

const findById = async (id: string) => {
  logger.info("---------Finding message by ID---------");
  logger.info("Message ID:", id);
  return await Message.findById(id);
};

const findAll = async () => {
  logger.info("---------Finding all messages---------");
  return await Message.find({});
};

export default { create, findById, findAll };
