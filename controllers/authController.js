import User from "../models/User.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";


export const signup = asyncErrorHandler(async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        msg: "User created successfully",
        error: false,
        data: {
            user: newUser,
        },
    });
});

