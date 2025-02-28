import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validator: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6
    },
    // confirmPassword: {
    //     type: String,
    //     required: [true, "Confirm Password is required"],
    //     validate: {
    //         validator: function (value) {
    //             return value === this.password;
    //         },
    //         message: "Passwords do not match"
    //     }
    // }
});
//encrypt password
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); //if password is not modified, return next

    const salt = await bcrypt.genSalt(10);
    //encrypt password before saving
    this.password = await bcrypt.hash(this.password, salt);
    
    //this.confirmPassword = undefined;
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;
