const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//@desc register a user
//@route POST /api/users/register
//@access private
const registerUser = asyncHandler(async (req, res) => {
    // We accept both 'username' or 'name' just in case you send "name" from Postman!
    const username = req.body.username || req.body.name;
    const { email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already registered!');
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: ", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        // Only return safe user data (exclude password)
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error('User data is not valid');
    }
});

//@desc login a user
//@route POST /api/users/login
//@access private
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m",
            });
        res.status(200).json({ accessToken });
    }
    else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

//@desc get current user
//@route GET /api/users/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getCurrentUser };