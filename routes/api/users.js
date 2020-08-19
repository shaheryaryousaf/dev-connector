const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
    check,
    validationResult
} = require("express-validator");
const gravatar = require("gravatar");

// Load User
const User = require("../../models/User");


// @route   POST api/users
// desc     Register User
// @access  Public 
router.post("/", [
    check("name", "Name is requeired").not().isEmpty(),
    check("email", "Please add a valid email").isEmail(),
    check("password", "Please add passowrd with 6 or more characters").isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);

    // Check validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() // this will get errors from validation
        })
    }

    const {
        name,
        email,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            email: email
        });

        // See if User exist
        if (user) {
            return res.status(400).json({
                errors: [{
                    msg: "User already exist"
                }]
            })
        }

        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })


        // Encrypt Password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save(); // this returns a promise, that's why we can get ID in payload


        // Return JsonWebToken

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret") /* this is comming from defauly.json*/ , {
            expiresIn: 3600000 // token will expire in seconds
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