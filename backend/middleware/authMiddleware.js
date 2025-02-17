
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config()


const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    //const token = req.cookies;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    //console.log('Decoded token below')
    //console.log(decodedToken)
    const user = await User.findById(decodedToken.userId);
    //console.log('User below')
    //console.log(user)
    if(user) {
        console.log('This is the user', user)
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded)
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        console.log('error in login auth--->',error.message)
        res.status(401).send({ error: 'Please authenticate.' });
    }
};



/*
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};
*/

export default authMiddleware