import { Router } from "express";
//import { handleMessage } from "../controllers/messageController";
import messageController from "../controllers/messageController";

const router: Router = Router();

// Recieve Message
router.post("/", messageController.receiveMessage);

// Meta API webhook
router.get("/", messageController.validateWebhook);

export default router;
