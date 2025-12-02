import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export async function protect(req, res, next) {
    try {

        const auth = req.headers.authorization || '';
        if (!auth.startsWith('Bearer ')) {
            res.status(401);
            throw new Error('Not authorized, token missing');
        }

        const token = auth.split(' ')[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(401);
            throw new Error("Invalid or expired token");
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            res.status(401);
            throw new Error('Not authorized, user not found');
        }

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