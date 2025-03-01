import User from "../models/User.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_STR,{
        expiresIn: process.env.LOGIN_EXPIRES,
    });
};

export const signup = asyncErrorHandler(async (req, res, next) => {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
        msg: "User created successfully",
        error: false,
        token,
        data: {
            user: newUser,
        },
    });
});

export const login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are present in req.body
    if (!email || !password) {
        return res.status(400).json({
            msg: !email ? "Email is missing" : "Password is missing",
            error: true,
        });
    }

    //Check if user exists with this email
    const user = await User.findOne({ email }).select("+password"); //password is hidden in the user model by setting select to false. but this option we want password so use this method for it select(+password)
    //check password
    //const isMatched = await user.comparePasswordInDB(password, user.password);
    //user exists and password is correct
    if (!user || !(await user.comparePasswordInDB(password, user.password))) {
        return res.status(400).json({
            msg: "Password or email is incorrect",
            error: true,
        });
    }

    const token = signToken(user._id);

    res.status(200).json({
        msg: "Login successful",
        error: false,
        token
    });
});