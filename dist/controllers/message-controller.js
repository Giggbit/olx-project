import { Message } from "../models/message-model.js";
import { User } from "../models/user-model.js";
import { Advert } from "../models/advert-model.js";
export class MessageController {
    static async sendMessage(req, res) {
        try {
            const senderId = req.user.userId;
            const { receiverId, advertId, content } = req.body;
            const advert = await Advert.findByPk(advertId);
            if (!advert) {
                return res.status(404).json({ message: "Advert not found" });
            }
            const receiver = await User.findByPk(receiverId);
            if (!receiver) {
                return res.status(404).json({ message: "Receiver not found" });
            }
            const message = await Message.create({
                senderId,
                receiverId,
                advertId,
                content,
            });
            res.status(201).json({ message: "Message sent successfully", data: message });
        }
        catch (error) {
            console.error("Error sending message:", error);
            res.status(500).json({ message: "Error sending message", error });
        }
    }
    static async getMessages(req, res) {
        try {
            const userId = req.user.userId;
            const { otherUserId, advertId } = req.query;
            const messages = await Message.findAll({
                where: {
                    advertId,
                    senderId: [userId, otherUserId],
                    receiverId: [userId, otherUserId],
                },
                order: [["createdAt", "ASC"]],
            });
            res.status(200).json({ messages });
        }
        catch (error) {
            console.error("Error fetching messages:", error);
            res.status(500).json({ message: "Error fetching messages", error });
        }
    }
    static async deleteMessage(req, res) {
        try {
            const userId = req.user.userId;
            const { messageId } = req.params;
            const message = await Message.findByPk(messageId);
            if (!message || (message.senderId.toString() !== userId && message.receiverId.toString() !== userId)) {
                return res.status(404).json({ message: "Message not found or access denied" });
            }
            await message.destroy();
            res.status(200).json({ message: "Message deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting message:", error);
            res.status(500).json({ message: "Error deleting message", error });
        }
    }
}
