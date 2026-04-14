require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken');
const UserRouter = express.Router();
const UserModel = require('../models/userModel');

// importing bcrypt to hash the password.
const bcrypt = require('bcrypt');
const saltRounds = 10;

// handle signup page.

UserRouter.post("/signup", (req, res) => {
    try {
        const { username, email, password } = req.body;

        //hashing the password
        bcrypt.hash(password, saltRounds, async function (err, hash) {

            if (err) {
                res.status(500).json({ message: 'Something went Wrong!' })
            }
            else {
                //creating user db along with hashed password.
                await UserModel.create({
                    username,
                    email,
                    password: hash
                });

                res.status(200).json({ message: `Welcome ${username} Signup Successful` });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." })
    }
})



//handle login page.
UserRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //checking user is available or not.
        let user = await UserModel.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "user not found please signup" });
        }
        else {

            //compare the hashed password.
            let hash = user.password;
            bcrypt.compare(password, hash).then(function (result) {
                if (result) {

                    var token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

                    console.log(token);

                    res.status(302).json({ message: "logged in Successful", token });
                }
                else {
                    res.status(401).json({ message: "Wrong Password Please try again" });
                }
            })
        }

    } catch (error) {
        res.status(403).json({ message: "Something went wrong" })
    }

})

module.exports = UserRouter;
