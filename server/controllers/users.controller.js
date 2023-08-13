// ---------------------------------------------------
// CONTROLLER SETUP - User
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 2) Importing Model
const UserModel = require("../models/users.model");

// 3) Defining Salt Rounds
const saltRounds = 10;

// 4) Exporting Controller functions
module.exports = {
  // I) REGISTER
    registerUser: (req, res) => {
        let data = req.body;
        if (!Object.keys(data).includes("password")){
            return res.status(500).json({error: {password: "Password is mandatory"}})
        }
        bcrypt.hash(data["password"], saltRounds, function(err, hash) {
            if (err){
                return res.status(500).json({error: err})
            }
            data = {...data, password: hash}
            UserModel.create(data)
                .then(() => {
                    res.json({succes: true})
                })
                .catch((error) => {
                    if (error instanceof mongoose.Error.ValidationError){
                        let keys = Object.keys(error.errors);
                        let error_dict = {};
                        keys.map((key) => {
                            error_dict[key] = error.errors[key].message
                        });
                        res.status(500).json({error: error_dict})
                    } else {
                        res.status(500).json({error: error})
                    }
                });
        });
    },
  // II) LOGIN
    loginUser : (req, res) => {
        let data = req.body;
        if (!Object.keys(data).includes("password"))
            res.status(500).json({error:"No mando password"});
            UserModel.findOne({email: data["email"]})
            .then((user) => {
                if (user){
                    bcrypt.compare(data["password"], user.password, function(err, result) {
                        if (result){
                            let userInfo = {
                                _id: user._id,
                                name: user.userName,
                                email: user.email
                            }
                            const token = jwt.sign(userInfo, process.env.SECRET);
                            const cookieOptions = {
                                httpOnly: true,
                                expires: new Date(Date.now() + 900000000)
                            }
                            return res.cookie("token", token, cookieOptions).json({succes: true, user: userInfo})
                        } else {
                            res.status(401).json({error: "Email and password combination doesn't match"})
                        }
                    });
                }
                else
                    res.status(404).json({error:"Combinación email y clave no existen"});
            })
            .catch((error) => {
                res.status(500).json({error});
            });
    },
}