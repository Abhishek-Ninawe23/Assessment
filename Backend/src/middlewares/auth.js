import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export async function protect(req, res, next) {
    try {

        //get token from cookies
        const token = req.cookies.token;

        if (!token) {
            res.status(401);
            throw new Error("Not authorized, token missing");
        }

        //decode the token and get user id
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(401);
            throw new Error("Invalid or expired token");
        }

        //find the user by id and exclude password
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            res.status(401);
            throw new Error('Not authorized, user not found');
        }

        //attach user to request object
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            res.status(401);
            error.message = 'Invalid or expired token';
        }
        next(error);
    }
}