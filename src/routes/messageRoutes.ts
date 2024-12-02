import { Router } from "express";
import { chatWithUser } from "../services/chatService";
import messageController from "../controllers/messageController";

const router: Router = Router();

// Recieve Message
router.post("/", messageController.receiveMessage);

// Meta API webhook
router.get("/", messageController.validateWebhook);

// Handle ChatGPT request
/* router.post("/chat", async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "userId and message are required" });
  }

  try {
    const response = await chatWithUser(userId, message);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}); */

export default router;
