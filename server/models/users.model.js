// ---------------------------------------------------
// MODEL SETUP - User
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");

// 2) Creating Schema for Model (blueprint)
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "You should send you'r name"],
        minLength: [2, "The name is not valid"]
    },
    email: {
        type: String,
        required: [true, "You should send a email"],
    },
    password: {
        type: String,
        required: [true, "You should send a password"],
    },
}, {
    timestamps: true
});

// 3) Creating Model using Schema
const UserModel = mongoose.model("Users", UserSchema);

// 4) Exporting Model
module.exports = UserModel;