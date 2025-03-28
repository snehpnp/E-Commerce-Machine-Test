const jwt = require("jsonwebtoken"); 

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: false, message: "Access denied. No token provided.", data: [] });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const decoded = jwt.verify(token, "asdfghjkl"); 
        console.log("Decoded Token:", decoded); 

        req.user = decoded; 
        next();
    } catch (error) {
        console.error("Token verification error:", error.message); 
        return res.status(400).json({ status: false, message: "Invalid token.", data: [] });
    }
};
