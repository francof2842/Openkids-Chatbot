import { Request, Response } from "express";
import { processMessage } from "../services/messageService";

export const handleMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { from, to, message, timestamp } = req.body;
    if (!from || !to || !message || !timestamp) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const response = await processMessage(req.body);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
