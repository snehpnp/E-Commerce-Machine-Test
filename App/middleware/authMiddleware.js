const jwt = require("jsonwebtoken"); // Import JWT

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: false, message: "Access denied. No token provided.", data: [] });
    }

    const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'

    try {
        const decoded = jwt.verify(token, "asdfghjkl"); // Make sure secret key is correct
        console.log("Decoded Token:", decoded); // Debugging

        req.user = decoded; // Attach decoded token to req.user
        next();
    } catch (error) {
        console.error("Token verification error:", error.message); // Debugging
        return res.status(400).json({ status: false, message: "Invalid token.", data: [] });
    }
};
