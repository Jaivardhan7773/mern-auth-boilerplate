import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


//middleare for updating profile for now
export const userAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            return res.status(401).json({
                message: "Cannot get token"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "Invalid user"
            })
        }
        req.user = user
        next();
    } catch (error) {
        console.log("error in userAuthMiddleware");
        res.status(500).json({
            message: "Internal server err"
        });
    }
}
