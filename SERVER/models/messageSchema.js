import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reciverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: " User",
            required: true,
        },
        text: { type: String },
        image: {
            type: String,
        },
    } ,
    {timestamps: true}
);
const Message = mongoose.model("Messages", messageSchema);
export default Message ;