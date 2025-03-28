const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");


exports.register = async (req, res) => {
    try {
        // Validate input
        await body("name").notEmpty().withMessage("Name is required").run(req);
        await body("email").isEmail().withMessage("Invalid email format").run(req);
        await body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").run(req);
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, message: "Validation errors", data: errors.array() });
        }

        const { name, email, password, role } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ status: false, message: "Email already registered", data: [] });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ status: true, message: "User registered successfully", data: [{ id: user._id, name, email, role }] });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error", data: [error.message] });
    }
};

exports.login = async (req, res) => {
    try {
        await body("email").isEmail().withMessage("Invalid email format").run(req);
        await body("password").notEmpty().withMessage("Password is required").run(req);
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, message: "Validation errors", data: errors.array() });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ status: false, message: "Invalid credentials", data: [] });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ status: false, message: "Invalid credentials", data: [] });

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            "asdfghjkl",
            { expiresIn: "1h" }
        );

        res.json({
            status: true,
            message: "Login successful",
            data: [{ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }]
        });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error", data: [error.message] });
    }
};

exports.getProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ status: false, message: "Unauthorized", data: [] });
        }

        const user = await User.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found", data: [] });
        }

        res.json({
            status: true,
            message: "User profile fetched successfully",
            data: [{ id: user._id, name: user.name, email: user.email, role: user.role }]
        });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error", data: [error.message] });
    }
};

