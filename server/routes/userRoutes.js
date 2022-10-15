import express from "express";
import User from "../models/User.js";
import expressAsyncHandler from 'express-async-handler';
const userRouter = express.Router();
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { generateToken } from "../utils.js";


userRouter.post('/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.json({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).json({ message: 'Invalid email or password' });
    })
);

export default userRouter;

