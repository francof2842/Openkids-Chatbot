import Message, { IMessage } from "../models/Message";

export const saveMessage = async (message: IMessage): Promise<IMessage> => {
  const newMessage = new Message(message);
  return await newMessage.save();
};
