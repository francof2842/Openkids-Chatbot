import { Request, Response } from "express";
import { logger, errorLogger } from "../utils/logger";
import whatsappService from "../services/whatsappService";
import { chatWithUser } from "../services/chatService";

/* export const handleMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { from, to, message, timestamp } = req.body;
    logger.info("Controller initialized");
    if (!from || !to || !message || !timestamp) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const response = await messageService.processMessage(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing message:", error);
    errorLogger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}; */

const receiveMessage = async (req: Request, res: Response) => {
  try {
    var entry = (req.body["entry"] as Array<any>)[0];
    var changes = (entry["changes"] as Array<any>)[0];
    var messageObject = changes?.value?.messages;

    if (typeof messageObject !== "undefined") {
      var message = messageObject[0];
      const from = message?.from;

      var text = getTextUser(message);

      logger.info(`Received message from ${from}: ${text}`);

      // Send the message to chatGPT
      const response = await chatWithUser(from, text);
      logger.info(`Response from chatGPT: ${response}`);

      whatsappService.sendWhatsappMessage(
        from,
        response ? response : "Lo siento, no entendi tu mensaje"
      );

      // Store the message
      //await messageService.storeMessage({ sender: from, text: body });

      // Respond to the message
      //const reply = await messageService.generateReply(body);
      //await messageService.sendReply(from, reply);
    }

    // Acknowledge the message to whatsapp API, this is a must
    res.status(200).send("EVENT_RECEIVED");

    //res.status(200).send("Message processed successfully");
  } catch (error) {
    const errorMessage = (error as Error).message;
    errorLogger.error(`Error processing message: ${errorMessage}`);

    // Acknowledge the message to whatsapp API, this is a must
    res.status(500).send("EVENT_RECEIVED");
    //res.status(500).send("Internal Server Error");
  }
};

const validateWebhook = (req: Request, res: Response) => {
  const VERIFY_TOKEN = "open_kids_bot"; // Replace with your token

  // Extract query parameters
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Check if mode and token are valid
  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook validated successfully!");
      res.status(200).send(challenge); // Respond with hub.challenge
    } else {
      console.error("Webhook validation failed: Invalid token");
      res.status(403).send("Forbidden"); // Token mismatch
    }
  } else {
    console.error("Webhook validation failed: Missing mode or token");
    res.status(400).send("Bad Request"); // Missing parameters
  }
};

function getTextUser(message: any) {
  var text = "";
  var typeMessage = message?.type;

  if (typeMessage === "text") {
    text = message?.text?.body;
  } else if (typeMessage === "interactive") {
    var interactiveObject = message?.interactive;
    var typeInteractive = interactiveObject?.type;

    if (typeInteractive === "button_reply") {
      text = interactiveObject?.button_reply?.title;
    } else if (typeInteractive === "list_reply") {
      text = interactiveObject?.list_reply?.title;
    } else {
      errorLogger.error("Interactive type not supported");
    }
  } else {
    errorLogger.error("Message type not supported");
  }
  return text;
}

export default { receiveMessage, validateWebhook };
