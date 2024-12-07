import messageRepository from "../repositories/messageRepository";

/* const processMessage = async (
  message: IMessage
): Promise<{ message: string }> => {
  logger.info("Service initialized");
  await saveMessage(message);
  return { message: "Message received and logged" };
}; */

const storeMessage = async (message: { sender: string; text: string }) => {
  await messageRepository.create(message);
};

const generateReply = async (message: string) => {
  // Placeholder for GPT or rule-based response logic
  return `You said: ${message}`;
};

export default { storeMessage, generateReply };
