import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./models/Employee.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
const port = 3001;

dotenv.config(); 

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
    res.send('API is running');
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await EmployeeModel.findOne({ email });
        if (user) {
            if (password === user.password) {
                res.json("Login Successful");
            } else {
                res.json("Password didn't match");
            }
        } else {
            res.json("User not registered");
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const employee = await EmployeeModel.create(req.body);
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: "Failed to register user" });
    }
});

app.listen(port, () => {
    console.log("Server is running on port 3001");
});
