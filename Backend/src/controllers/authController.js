import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { loginSchema, registerSchema } from "../validators/authValidators.js";
import { generateToken } from "../utils/jwt.js";


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
        const { name, username, email, password, phone, profileImage } = req.body;


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
        const { identifier, password } = req.body;

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
}
