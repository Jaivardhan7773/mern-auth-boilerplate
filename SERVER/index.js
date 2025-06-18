import express from 'express';
const app = express();
import cors from 'cors'
import mongoose from 'mongoose';
import authenticationRoutes from "./routes/authentication.js"
import messageRoutes from "./routes/message.js"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// app.use(express.json());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true, 
}))

app.use("/api/authentication", authenticationRoutes);
app.use("/api/message", messageRoutes);



mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB is connected");
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
            
        });
    })
    .catch((e) => {
        console.error("MongoDB connection error:", e);
        process.exit(1);
    });
