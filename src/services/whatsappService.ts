import axios from "axios";
import { errorLogger, logger } from "../utils/logger";

const sendWhatsappMessage = async (recipient: string, message: string) => {
  const phoneNumberId = process.env.META_PHONE_NUMBER_ID;
  const metaVer = process.env.META_API_VERSION;

  const url = `https://graph.facebook.com/${metaVer}/${phoneNumberId}/messages`; // WhatsApp API endpoint
  const token = process.env.META_API_KEY;

  try {
    await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: recipient,
        text: { body: message },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    errorLogger.error(`Error sending message to ${recipient}: ${error}`);
    // Handle the error appropriately here
  }
  logger.info(`Message sent to ${recipient}: ${message}`);
};

export default { sendWhatsappMessage };
