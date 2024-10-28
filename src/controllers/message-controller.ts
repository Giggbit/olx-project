import { Request, Response } from "express";
import { Message } from "../models/message-model.js";

export class MessageController {
    static async createMessage(req: Request, res: Response) {
        try {
            const message = await Message.create(req.body);
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ message: "Error creating message", error });
        }
    }

    static async getMessage(req: Request, res: Response) {
        try {
            const message = await Message.findByPk(req.params.id);
            if (!message) return res.status(404).json({ message: "Message not found" });
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving message", error });
        }
    }

    static async deleteMessage(req: Request, res: Response) {
        try {
            const message = await Message.findByPk(req.params.id);
            if (!message) return res.status(404).json({ message: "Message not found" });
            await message.destroy();
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: "Error deleting message", error });
        }
    }
}
