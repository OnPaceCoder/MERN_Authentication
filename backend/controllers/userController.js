import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'

// import sendMail from '../utils/generateMail.js'




// @desc   Auth  user/settoken
// route   POST  /api/users/auth
// @access Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401);
        throw new Error("Invalid email or password")
    }


})


//@desc Register a new user
//route POST /api/users
// access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }
    const config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }
    const transporter = nodemailer.createTransport(config)
    const MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Priyank Inc.",
            link: 'https://mailgen.js/',
            copyright: 'Copyright © 2023 Priyank Inc. All rights reserved.',

        }
    })
    const response = {
        body: {
            name: name,
            intro: "You are registered successfully",

            outro: "Looking forward for your feedback"
        }
    }
    const mail = MailGenerator.generate(response)
    const message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Registration Succesfull",
        html: mail
    }
    const user = await User.create({ name, email, password })

    if (user) {
        generateToken(res, user._id)

        try {
            const response = await transporter.sendMail(message)
            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email
            })
        } catch (error) {
            res.status(400)
            throw new Error(error)
        }



    } else {
        res.status(400);
        throw new Error("Invalid user data")
    }

})


//@desc Logout user
//route POST /api/users/logout
//@access Public

const logout = asyncHandler(async (req, res) => {

    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'Logout user' })
})

//@desc Get user profile
//route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})


//@desc Update user profile
//route PUT /api/users/logout
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })

    } else {
        res.status(404);
        throw new Error("User not found")
    }

})



export {
    authUser,
    registerUser,
    logout,
    getUserProfile,
    updateUserProfile
}