const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {

    // Get Token from header
    const token = req.header("x-auth-token");

    // Check if no token
    if (!token) {
        return res.status(401).json({
            msg: "No token, authorization denied"
        });
    }

    // Verify Token
    try {
        const decode = jwt.verify(token, config.get("jwtSecret"));

        // put requested user to decode.user (payload user), we can use this req.user in any of our protected route and get user profile

        req.user = decode.user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            msg: "Token is not valid"
        })
    }

}