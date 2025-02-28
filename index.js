import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./models/Employee.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import { generateToken, verifyToken } from "./utils/jwt.js";
import authRouter from "./routes/authRoutes.js";

const port = 3001;

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
    res.send('API is running');
})

//using routes
app.use('/api/v1/users',authRouter);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await EmployeeModel.findOne({ email });
        if (user) {
            if (password === user.password) {
                //gen token 
                const payload ={
                    username: user.name,
                }
                const token = generateToken(payload);
                console.log(token);

                res.status(200).json({
                    msg: "Login successful",
                    error: false,
                    data:{
                        token,
                    }
                });
            } else {
                res.status(400).json({
                    msg: "Invalid credentials",
                    error: true
                });
            }
        } else {
            res.status(400).json({
                msg: "User not registered",
                error: true
            });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// app.post("/register", async (req, res) => {
//     try {
//         const employee = await EmployeeModel.create(req.body);
//         res.json(employee);
//     } catch (err) {
//         res.status(500).json({ error: "Failed to register user" });
//     }
// });
app.post("/validate", async (req, res) => {
    try {
        const { token } = req.body;
        const payload = verifyToken(token);
        if (payload) {
            res.status(200).json({
                msg: "Token is valid",
                error: false,
                data: {
                    username: payload.username,
                },
            });
        } else {
            res.status(400).json({
                msg: "Invalid token",
                error: true,
            });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log("Server is running on port 3001");
});
