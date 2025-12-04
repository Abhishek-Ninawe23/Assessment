import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";
import { generateToken } from "../utils/jwt.js";
import { createCaptchaToken, verifyCaptchaToken } from "../utils/captcha.js"


////// Controllers //////
// Register Controller
export async function register(req, res, next) {
    try {
        //check whether the passed data is proper or not using joi validator
        const { error } = registerSchema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }

        //destructure passed data into variables
        const { name, username, email, password, phone, profileImage, captcha, captchaToken } = req.body;

        //check captcha is valid or not
        if (!captcha || !captchaToken) {
            res.status(400);
            throw new Error("Captcha is required")
        }
        const isCaptchaValid = verifyCaptchaToken(captchaToken, captcha);
        if (!isCaptchaValid) {
            res.status(400);
            throw new Error("Captcha is Invalid")
        }

        // check unique email & username
        const exist = await User.findOne({ $or: [{ email }, { username }] });
        if (exist) {
            res.status(400);
            throw new Error('User with given email or username already exists');
        }

        //hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create the user with hashed password
        const user = await User.create({ name, username, email, password: hashedPassword, phone, profileImage });

        //generate JWT token
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        //send response to client
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                profileImage: user.profileImage
            },
            token
        });


    } catch (error) {
        next(error);
    }
}

// Login Controller
export async function login(req, res, next) {
    try {

        //check whether the passed data is proper or not using joi validator
        const { error } = loginSchema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }

        //destructure passed data into variables
        const { identifier, password, captcha, captchaToken } = req.body;


        //check captcha is valid or not
        if (!captcha || !captchaToken) {
            res.status(400);
            throw new Error("Captcha is required")
        }
        const isCaptchaValid = verifyCaptchaToken(captchaToken, captcha);
        if (!isCaptchaValid) {
            res.status(400);
            throw new Error("Captcha is Invalid")
        }


        //find user by email or username, explicitly include password (it's set select: false in schema)
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] }).select('+password');
        if (!user) {
            res.status(401);
            throw new Error("Invalid Credentials");
        }

        //compare the password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401);
            throw new Error("Invalid Credentials");
        }

        //generate JWT token
        const token = generateToken(user);

        //store token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        //send response to client
        res.status(200).json({
            message: 'User Login successful',
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                profileImage: user.profileImage
            },
            token
        });

    } catch (error) {
        next(error);
    }
};

export const logoutUser = (req, res) => {
    //way 1:clear the cookie by setting it to empty + immediate expiry
    //way 2:clear cookie using res.clearCookie and cookie name
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: false
    });

    res.status(200).json({ message: "Logged out successfully" });
};

//get logged in user details
export const getMe = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
};

//get captcha for login and register
export const getCaptcha = (req, res) => {
    const { captchaText, token } = createCaptchaToken();

    // send captcha text and captchaToken to frontend
    res.json({
        success: true,
        captchaText,
        captchaToken: token
    });
}