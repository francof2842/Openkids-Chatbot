import { Router } from "express";
import { handleMessage } from "../controllers/messageController";

const router: Router = Router();

// Placeholder webhook
router.post("/webhook", handleMessage);

export default router;
