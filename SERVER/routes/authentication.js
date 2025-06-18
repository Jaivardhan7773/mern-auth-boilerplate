import express from "express";
const router = express.Router()
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken } from "../UTILS/utils.js";
import { userAuthMiddleware } from "../middlewares/userMiddleware.js"
import cloudinary from "../UTILS/cloudinary.js";

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log(req.body)
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are mendetory"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "password must be atleast six characters"
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const saltRound = 10;
        const hashpassword = await bcrypt.hash(password, saltRound);

        const newUser = new User({
            fullName,
            email,
            password: hashpassword
        });

        if (newUser) {
            //JWT CODE
            await newUser.save();
            generateToken(newUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,

            });
        } else {
            res.status(400).json({
                message: "Invalid data"
            });
        }
    } catch (error) {
        console.log("Error in Signup route", error.message);
        res.status(500).json({
            message: "INternal server error"
        })

    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User doesn't exists"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid cred..."
            })
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user.id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("error in login route");
        res.status(500).json({
            message: "Internal server err"
        });
    }
});

router.post("/logout", (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            message: "Logout successfull"
        });
    } catch (error) {
        console.log("error in logout route ")
        res.status(500).json({
            message: "Internal server err"
        });
    }
});

router.put("/update-profile", userAuthMiddleware, async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
        if(!profilePic){
            return res.status(400).json({
                message: "Please provide a valid image"
            });
        }
        const uploadpic = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId , {profilePic:uploadpic.secure_url} , {new:true});
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("error in logout route ")
        res.status(500).json({
            message: "Internal server err"
        });
    }
});

router.get("/check" , userAuthMiddleware , async(req, res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in /check router in authentication file ");
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

export default router;