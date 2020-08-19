const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
    check,
    validationResult
} = require("express-validator");

const User = require("../../models/User");


// @route   GET api/auth
// desc     Auth Route
// @access  Private 
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
});


// @route   POST api/auth
// desc     Authenticate User and Return Token
// @access  Public
router.post("/", [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid Password").exists()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() // this will get errors from validation
        })
    }

    const {
        email,
        password
    } = req.body;

    try {

        // Get single User
        let user = await User.findOne({
            email
        });

        // Check if User exists
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: "Invalid Credentials"
                }]
            })
        }

        // Decrypt Password
        const isMatch = await bcrypt.compare(password.toString(), user.password);

        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: "Invalid Credentials"
                }]
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({
                token
            });
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }



});


module.exports = router;