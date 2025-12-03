import jwt from "jsonwebtoken";

// Generate JWT Token
function generateToken(user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    return token;
}

export { generateToken };