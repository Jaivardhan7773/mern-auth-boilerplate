import express from "express";
import { userAuthMiddleware } from "../middlewares/userMiddleware.js";
import User from "../models/userModel.js";
import Message from "../models/messageSchema.js";

const router = express.Router();

router.get("/users", userAuthMiddleware, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterdUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filterdUsers);
    } catch (error) {
        console.log("Error ni message.js route")
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.get("/:id", userAuthMiddleware, async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { myId: myId, receiverId: userToChatId },
                { myId: userToChatId, reciverId: myId }
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error ni get message.js route")
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.post("/send/:id", userAuthMiddleware, async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if (image) {
            const uploadpic = await cloudinary.uploader.upload(image);
            imageUrl = uploadpic.secure_url;
        }
        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image:imageUrl,
        });
        await newMessage.save();
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error ni message.js send message by id route")
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
export default router;